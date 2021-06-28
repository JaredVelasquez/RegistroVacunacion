import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'VacunacionDBO',
  connector: 'mssql',
  url: 'mssql://jared:1234@DESKTOP-914IUVT/RegistroVacunacion',
  host: 'DESKTOP-914IUVT',
  port: 1433,
  user: 'jared',
  password: '1234',
  database: 'RegistroVacunacion'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class VacunacionDboDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'VacunacionDBO';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.VacunacionDBO', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
