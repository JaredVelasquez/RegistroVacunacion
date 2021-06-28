import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {IdentificacionRepository, PersonaRepository, RegistroVacunacionRepository, VacunaRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PersonaService {
  constructor(
    @repository(IdentificacionRepository)
    public identificacionRepository: IdentificacionRepository,
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(RegistroVacunacionRepository)
    public registroVacunacionRepository: RegistroVacunacionRepository,
    @repository(VacunaRepository)
    public vacunaRepository: VacunaRepository,

  ) {
  }

  async Exist(NumeroIdentidad: any) {

    if (!NumeroIdentidad) {
      throw new HttpErrors[400]('Numero de indentidad vacio');
    }
    let ExitePersona = await this.identificacionRepository.findOne({where: {numeroIdentificacion: NumeroIdentidad}});

    if (!ExitePersona)
      throw new HttpErrors[400]('Esta persona no esta registada en el Registro Nacional')


    let personaIdentificada = await this.personaRepository.findOne({where: {idRegistro: ExitePersona.idRegistro}});

    return personaIdentificada;
  }
  async EstaVacunada(identificadorPersona: any) {

    if (!identificadorPersona)
      throw new HttpErrors[400]('No se envio un identificador de persona');


    let Persona = await this.personaRepository.findOne({where: {idPersona: identificadorPersona}});

    if (!Persona)
      throw new HttpErrors[400]('La persona no esta registrada en registro nacional de personas');

    let PersonaEstaVacunada = await this.registroVacunacionRepository.findOne({where: {idPersona: identificadorPersona}});

    if (PersonaEstaVacunada)
      throw new HttpErrors[400]('Esta persona ya fue vacunada');


    return false;

  }

  async AsignarVacuna(identificadorPersona: number, identificadorVacuna: number) {
    if (!identificadorPersona)
      throw new HttpErrors[400]('idenficador de persona esta vacio');
    if (!identificadorVacuna)
      throw new HttpErrors[400]('identificador de vacuna vacio');

    const nuevaVacunacion = {
      idPersona: identificadorPersona,
      idVacuna: identificadorVacuna
    }

    let ExisteVacuna = await this.vacunaRepository.findOne({where: {idVacuna: identificadorVacuna}});
    if (!ExisteVacuna)
      throw new HttpErrors[400]('Esta vacuna no existe');


    if (ExisteVacuna.disponibilidad != 'disponible')
      throw new HttpErrors[400]('Esta vacuna ya se aplico a otra persona');



    let registrarVacunacion = await this.registroVacunacionRepository.create(nuevaVacunacion);


    const updateVacuna: any = {
      idDepartamento: ExisteVacuna.idDepartamento,
      idCiudad: ExisteVacuna.idCiudad,
      lote: ExisteVacuna.lote,
      nombre: ExisteVacuna.nombre,
      disponibilidad: 'no disponible'

    }

    await this.vacunaRepository.replaceById(ExisteVacuna.idVacuna, updateVacuna);



    return registrarVacunacion;
  }
}
