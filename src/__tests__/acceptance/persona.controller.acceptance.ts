import {Client, expect} from '@loopback/testlab';
import {VacunacionApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PersonaController', () => {
  let app: VacunacionApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('Deberia retornar la persona que existe segun el numero de identidad', async () => {
    const respuesta = await client.post('/Identificacion').send({
      identidad: '0507199902416',
    }).expect(200)
  });

  it('Verificar si la persona a sido vacunada', async () => {
    const respuesta = await client.post('/esta-vacunado').send({
      idPersona: 1,
    }).expect(200);
    expect(respuesta.body).to.containEql(Boolean);
  });

  it('Deberia retornar las vacunas dispobinles en mi ciudad', async () => {
    const respuesta = await client.post('/existencia').send({
      "idPersona": 1
    }).expect(200)
    expect(respuesta.body).to.containEql(Object);
  });

  it('Deberia asignar una vacuna a una persona', async () => {
    const respuesta = await client.post('/asignar-vacuna').send({
      "idPersona": 1,
      "idVacuna": 1
    }).expect(200)
    expect(respuesta.body).to.containEql(Object);
  });




});
