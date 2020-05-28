import mongoose from 'mongoose';
import { MONGO_URI, MONGO_OPTIONS } from '../src/config';

export const mongoseConnect = async (Model) => {
  const connect = await mongoose.connect(MONGO_URI, MONGO_OPTIONS, (err) => {
    if (err) {
      process.exit(1);
    }
  });
  await Model.deleteMany({ email: 'team04@buidsdg.com' });
  return connect;
};

export const mongoseDisconnect = async () => {
  const disconnect = await mongoose.connection.close();
  return disconnect;
};

export const testData = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  password: 'ProblemStatement2',
  passwordConfirmation: 'ProblemStatement2'
};

export const failUnauthorize = async (response) => {
  const { body } = response;

  expect(body.status).toBe('error');

  expect(body.message).toBe('You must logged in');
};

export const passAuthorizeCRUD = async (response, model) => {
  const { body } = response;

  expect(response.statusCode).toBe(200);
  expect(body).toHaveProperty('status', 'success');
  expect(body).toHaveProperty('data.message');
  // expect(body).toHaveProperty('data.token');


  if (model === 'user') {
    expect(body).toHaveProperty('data.user');
  }
  if (model === 'org') {
    expect(body).toHaveProperty('data.org');
  }
};

export const saveModel = async (Model, data) => {
  const validUser = new Model(data);

  const savedModel = await validUser.save();

  return savedModel;
};
