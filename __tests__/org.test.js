import createApp from '../src/app';
import { Org } from '../src/models';
import {
  mongoseConnect, mongoseDisconnect, testData, failUnauthorize, passAuthorizeCRUD, saveModel
} from './genaralTestConfi';

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
    const response = await request.post('/api/v1/auth/create-org').send(testData);
    await passAuthorizeCRUD(response);
  });

  test('It should POST login Organization ', async () => {
    await saveModel(Org, testData);

    const response = await request.post('/api/v1/auth/login-org').send({
      email: testData.email,
      password: testData.password
    });

    await passAuthorizeCRUD(response);
  });

  test('It should fail PATCH Unauthorize Org ', async () => {
    const savedOrg = await saveModel(Org, testData);

    const response = await request.patch(`/api/v1/auth/org/${savedOrg.id}`).send({
      country: 'nigeria'
    });

    await failUnauthorize(response);
  });

  test('It should pass PATCH authorize Org ', async () => {
    const savedOrg = await saveModel(Org, testData);

    const org = await request.post('/api/v1/auth/login-org').send({
      email: testData.email,
      password: testData.password
    });

    const { token } = org.body.data;

    const response = await request.patch(`/api/v1/auth/org/${savedOrg.id}`).send({
      country: 'nigeria'
    }).set({ Authorization: `Bearer ${token}` });

    await passAuthorizeCRUD(response);
  });

  test('It should fail Delete Unauthorize Org ', async () => {
    const savedOrg = await saveModel(Org, testData);

    const response = await request.patch(`/api/v1/auth/org/${savedOrg.id}`);

    await failUnauthorize(response);
  });

  test('It should pass Delete authorize Org ', async () => {
    const savedOrg = await saveModel(Org, testData);

    const org = await request.post('/api/v1/auth/login-org').send({
      email: testData.email,
      password: testData.password
    });


    const { token } = org.body.data;

    const response = await request.delete(`/api/v1/auth/org/${savedOrg.id}`).set({ Authorization: `Bearer ${token}` });

    await passAuthorizeCRUD(response);
  });

  test('It should Get Org ', async () => {
    const savedOrg = await saveModel(Org, testData);

    const response = await request.get(`/api/v1/auth/org/${savedOrg.id}`);

    await passAuthorizeCRUD(response, 'org');
  });
});
