import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Persona} from '../models';
import {IdentificacionRepository, PersonaRepository, RegistroVacunacionRepository, VacunaRepository} from '../repositories';
import {PersonaService} from '../services/personas.service';
import {AsignacionVacunaModel, EstaVacunado, IdentificacionPersona} from '../temporalModels/persona';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(IdentificacionRepository)
    public identificacionRepository: IdentificacionRepository,
    @repository(RegistroVacunacionRepository)
    public registroVacunacionRepository: RegistroVacunacionRepository,
    @repository(VacunaRepository)
    public vacunaRepository: VacunaRepository,
    @service(PersonaService)
    public persona: PersonaService
  ) {
    this.persona = new PersonaService(identificacionRepository, personaRepository, registroVacunacionRepository, vacunaRepository);
  }
  @post('/esta-vacunado', {
    responses: {
      '200': {
        description: 'La persona fue vacunada'
      }
    }
  })
  async PersonaVacunada(
    @requestBody() estaVacunado: EstaVacunado
  ): Promise<any> {
    let FueVacunado = await this.persona.EstaVacunada(estaVacunado.idPersona);

    return FueVacunado;
  }

  @post('/Identificacion', {
    responses: {
      '200': {
        description: 'Identificacion de personas'
      }
    }
  })
  async identificacionPersona(
    @requestBody() identificacionPersona: IdentificacionPersona
  ): Promise<any> {
    let personaIdentificada = await this.persona.Exist(identificacionPersona.identidad);

    return personaIdentificada;
  }

  @post('/asinar-vacuna', {
    responses: {
      '200': {
        description: 'Identificacion de personas'
      }
    }
  })
  async AsignacionVacunas(
    @requestBody() asignacionVacunaModel: AsignacionVacunaModel
  ): Promise<any> {
    const AsignarVacuna = await this.persona.AsignarVacuna(asignacionVacunaModel.idPersona, asignacionVacunaModel.idVacuna);

    return AsignarVacuna;
  }



  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.personaRepository.create(persona);
  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
