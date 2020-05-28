import createApp from '../src/app';
import { User } from '../src/models';
import {
  mongoseConnect, mongoseDisconnect, testData, failUnauthorize, passAuthorizeCRUD, saveModel
} from './genaralTestConfi';

const supertest = require('supertest'); // Link to your server file

const app = createApp();

const request = supertest(app);

describe('Test the User Routes', () => {
  beforeEach(async () => {
    await mongoseConnect(User);
  });

  afterEach(async () => {
    await mongoseDisconnect();
  });

  test('It should POST New User ', async () => {
    const response = await request.post('/api/v1/auth/create-user').send(testData);
    await passAuthorizeCRUD(response);
  });

  test('It should POST login User ', async () => {
    await saveModel(User, testData);

    const response = await request.post('/api/v1/auth/login').send({
      email: testData.email,
      password: testData.password
    });


    await passAuthorizeCRUD(response);
  });

  test('It should fail PATCH Unauthorize User ', async () => {
    const savedUser = await saveModel(User, testData);

    const response = await request.patch(`/api/v1/auth/users/${savedUser.id}`).send({
      country: 'nigeria'
    });

    await failUnauthorize(response);
  });

  test('It should fail Delete Unauthorize User ', async () => {
    const savedUser = await saveModel(User, testData);

    const response = await request.delete(`/api/v1/auth/users/${savedUser.id}`);

    await failUnauthorize(response);
  });

  test('It should pass PATCH authorize User ', async () => {
    const savedUser = await saveModel(User, testData);

    const user = await request.post('/api/v1/auth/login').send({
      email: testData.email,
      password: testData.password
    });

    const { token } = user.body.data;

    const response = await request.patch(`/api/v1/auth/users/${savedUser.id}`).send({
      country: 'nigeria'
    }).set({ Authorization: `Bearer ${token}` });

    await passAuthorizeCRUD(response);
  });

  test('It should pass Delete authorize User ', async () => {
    const savedUser = await saveModel(User, testData);

    const user = await request.post('/api/v1/auth/login').send({
      email: testData.email,
      password: testData.password
    });

    const { token } = user.body.data;

    const response = await request.delete(`/api/v1/auth/users/${savedUser.id}`).set({ Authorization: `Bearer ${token}` });

    await passAuthorizeCRUD(response);
  });

  test('It should Get User ', async () => {
    const savedUser = await saveModel(User, testData);

    const response = await request.get(`/api/v1/auth/users/${savedUser.id}`);

    await passAuthorizeCRUD(response, 'user');
  });
});
