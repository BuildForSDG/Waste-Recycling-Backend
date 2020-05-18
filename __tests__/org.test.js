import createApp from '../src/app';
import { Org } from '../src/models';
import { mongoseConnect, mongoseDisconnect, orgData } from './genaralTestConfi';

const supertest = require('supertest'); // Link to your server file

const app = createApp();

const request = supertest(app);

describe('Test the Org Routes', () => {
  beforeEach(async () => {
    await mongoseConnect(Org);
  });

  afterEach(async () => {
    await mongoseDisconnect();
  });

  test('It should POST New Organization ', async () => {
    const response = await request.post('/api/v1/auth/create-org').send(orgData);
    expect(response.status).toBe(200);

    const org = await Org.findOne({ email: 'team04@buidsdg.com' });

    expect(org.email).toBe('team04@buidsdg.com');
  });
});
