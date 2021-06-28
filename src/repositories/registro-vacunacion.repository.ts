import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VacunacionDboDataSource} from '../datasources';
import {RegistroVacunacion, RegistroVacunacionRelations} from '../models';

export class RegistroVacunacionRepository extends DefaultCrudRepository<
  RegistroVacunacion,
  typeof RegistroVacunacion.prototype.idRegistroVacuna,
  RegistroVacunacionRelations
> {
  constructor(
    @inject('datasources.VacunacionDBO') dataSource: VacunacionDboDataSource,
  ) {
    super(RegistroVacunacion, dataSource);
  }
}
