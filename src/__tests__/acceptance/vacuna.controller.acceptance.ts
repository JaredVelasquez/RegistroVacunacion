import {Client} from '@loopback/testlab';
import {VacunacionApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PersonaService', () => {
  let app: VacunacionApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('', async () => {

  });



});
