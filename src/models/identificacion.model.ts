import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Identificacion'}}
})
export class Identificacion extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id_registro', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  idRegistro?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'numeroIdentificacion', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  numeroIdentificacion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Identificacion>) {
    super(data);
  }
}

export interface IdentificacionRelations {
  // describe navigational properties here
}

export type IdentificacionWithRelations = Identificacion & IdentificacionRelations;
