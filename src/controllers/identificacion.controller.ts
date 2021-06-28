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
import {Identificacion} from '../models';
import {IdentificacionRepository} from '../repositories';

export class IdentificacionController {
  constructor(
    @repository(IdentificacionRepository)
    public identificacionRepository : IdentificacionRepository,
  ) {}

  @post('/identificacions')
  @response(200, {
    description: 'Identificacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Identificacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identificacion, {
            title: 'NewIdentificacion',
            exclude: ['id'],
          }),
        },
      },
    })
    identificacion: Omit<Identificacion, 'id'>,
  ): Promise<Identificacion> {
    return this.identificacionRepository.create(identificacion);
  }

  @get('/identificacions/count')
  @response(200, {
    description: 'Identificacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Identificacion) where?: Where<Identificacion>,
  ): Promise<Count> {
    return this.identificacionRepository.count(where);
  }

  @get('/identificacions')
  @response(200, {
    description: 'Array of Identificacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Identificacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Identificacion) filter?: Filter<Identificacion>,
  ): Promise<Identificacion[]> {
    return this.identificacionRepository.find(filter);
  }

  @patch('/identificacions')
  @response(200, {
    description: 'Identificacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identificacion, {partial: true}),
        },
      },
    })
    identificacion: Identificacion,
    @param.where(Identificacion) where?: Where<Identificacion>,
  ): Promise<Count> {
    return this.identificacionRepository.updateAll(identificacion, where);
  }

  @get('/identificacions/{id}')
  @response(200, {
    description: 'Identificacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Identificacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Identificacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Identificacion>
  ): Promise<Identificacion> {
    return this.identificacionRepository.findById(id, filter);
  }

  @patch('/identificacions/{id}')
  @response(204, {
    description: 'Identificacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identificacion, {partial: true}),
        },
      },
    })
    identificacion: Identificacion,
  ): Promise<void> {
    await this.identificacionRepository.updateById(id, identificacion);
  }

  @put('/identificacions/{id}')
  @response(204, {
    description: 'Identificacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() identificacion: Identificacion,
  ): Promise<void> {
    await this.identificacionRepository.replaceById(id, identificacion);
  }

  @del('/identificacions/{id}')
  @response(204, {
    description: 'Identificacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.identificacionRepository.deleteById(id);
  }
}
