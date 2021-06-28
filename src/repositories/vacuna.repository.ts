import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VacunacionDboDataSource} from '../datasources';
import {Vacuna, VacunaRelations} from '../models';

export class VacunaRepository extends DefaultCrudRepository<
  Vacuna,
  typeof Vacuna.prototype.idVacuna,
  VacunaRelations
> {
  constructor(
    @inject('datasources.VacunacionDBO') dataSource: VacunacionDboDataSource,
  ) {
    super(Vacuna, dataSource);
  }
}
