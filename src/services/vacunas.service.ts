import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PersonaRepository, VacunaRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})

export class VacunaService {

  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(VacunaRepository)
    public vacunaRepository: VacunaRepository,
  ) { }


  async EnExistencia(identificadorPersona: any) {

    if (!identificadorPersona) {
      throw new HttpErrors[400]('No existe identificador de la persona');

    }

    const Persona = await this.personaRepository.findOne({where: {idPersona: identificadorPersona}});

    const vacunasDisponibles = await this.vacunaRepository.find({where: {idDepartamento: Persona?.idDepartamento}} && {where: {idCiudad: Persona?.idCiudad}})

    return vacunasDisponibles;
  }
}
