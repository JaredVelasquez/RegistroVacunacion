import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VacunacionDboDataSource} from '../datasources';
import {Ciudad, CiudadRelations} from '../models';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.idCiudad,
  CiudadRelations
> {
  constructor(
    @inject('datasources.VacunacionDBO') dataSource: VacunacionDboDataSource,
  ) {
    super(Ciudad, dataSource);
  }
}
