/* eslint-disable no-underscore-dangle */ import createApp from '../src/app';
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
  test('It should POST login Organization ', async () => {
    const response = await request.post('/api/v1/auth/login-org').send({
      email: 'lamido@gmail.com',
      password: 'Mypassword1234'
    });

    expect(response.statusCode).toBe(200);

    const org = await Org.findOne({ email: 'lamido@gmail.com' });

    expect(org.email).toBe('lamido@gmail.com');
  });

  test('It should fail PATCH Unauthorize Org ', async () => {
    const validOrg = new Org(orgData);

    const savedOrg = await validOrg.save();

    const response = await request.patch(`/api/v1/auth/users/${savedOrg._id}`).send({
      country: 'nigeria'
    });

    expect(response.statusCode).toBe(401);
  });
});
