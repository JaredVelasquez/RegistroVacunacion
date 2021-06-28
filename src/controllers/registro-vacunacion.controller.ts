import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroVacunacion} from '../models';
import {RegistroVacunacionRepository} from '../repositories';

export class RegistroVacunacionController {
  constructor(
    @repository(RegistroVacunacionRepository)
    public registroVacunacionRepository : RegistroVacunacionRepository,
  ) {}

  @post('/registro-vacunacions')
  @response(200, {
    description: 'RegistroVacunacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroVacunacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVacunacion, {
            title: 'NewRegistroVacunacion',
            exclude: ['id'],
          }),
        },
      },
    })
    registroVacunacion: Omit<RegistroVacunacion, 'id'>,
  ): Promise<RegistroVacunacion> {
    return this.registroVacunacionRepository.create(registroVacunacion);
  }

  @get('/registro-vacunacions/count')
  @response(200, {
    description: 'RegistroVacunacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroVacunacion) where?: Where<RegistroVacunacion>,
  ): Promise<Count> {
    return this.registroVacunacionRepository.count(where);
  }

  @get('/registro-vacunacions')
  @response(200, {
    description: 'Array of RegistroVacunacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroVacunacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroVacunacion) filter?: Filter<RegistroVacunacion>,
  ): Promise<RegistroVacunacion[]> {
    return this.registroVacunacionRepository.find(filter);
  }

  @patch('/registro-vacunacions')
  @response(200, {
    description: 'RegistroVacunacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVacunacion, {partial: true}),
        },
      },
    })
    registroVacunacion: RegistroVacunacion,
    @param.where(RegistroVacunacion) where?: Where<RegistroVacunacion>,
  ): Promise<Count> {
    return this.registroVacunacionRepository.updateAll(registroVacunacion, where);
  }

  @get('/registro-vacunacions/{id}')
  @response(200, {
    description: 'RegistroVacunacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroVacunacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RegistroVacunacion, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroVacunacion>
  ): Promise<RegistroVacunacion> {
    return this.registroVacunacionRepository.findById(id, filter);
  }

  @patch('/registro-vacunacions/{id}')
  @response(204, {
    description: 'RegistroVacunacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVacunacion, {partial: true}),
        },
      },
    })
    registroVacunacion: RegistroVacunacion,
  ): Promise<void> {
    await this.registroVacunacionRepository.updateById(id, registroVacunacion);
  }

  @put('/registro-vacunacions/{id}')
  @response(204, {
    description: 'RegistroVacunacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() registroVacunacion: RegistroVacunacion,
  ): Promise<void> {
    await this.registroVacunacionRepository.replaceById(id, registroVacunacion);
  }

  @del('/registro-vacunacions/{id}')
  @response(204, {
    description: 'RegistroVacunacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.registroVacunacionRepository.deleteById(id);
  }
}
