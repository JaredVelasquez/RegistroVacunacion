import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VacunacionDboDataSource} from '../datasources';
import {Identificacion, IdentificacionRelations} from '../models';

export class IdentificacionRepository extends DefaultCrudRepository<
  Identificacion,
  typeof Identificacion.prototype.idRegistro,
  IdentificacionRelations
> {
  constructor(
    @inject('datasources.VacunacionDBO') dataSource: VacunacionDboDataSource,
  ) {
    super(Identificacion, dataSource);
  }
}
