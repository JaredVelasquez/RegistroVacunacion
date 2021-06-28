import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VacunacionDboDataSource} from '../datasources';
import {Departamento, DepartamentoRelations} from '../models';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.idDepartamento,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.VacunacionDBO') dataSource: VacunacionDboDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
