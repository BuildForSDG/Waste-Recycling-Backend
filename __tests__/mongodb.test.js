import { User } from '../src/models';
import {
  mongoseConnect, mongoseDisconnect, testData, saveModel
} from './genaralTestConfi';

const testDataWithInvalidField = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  secret: 'not valid',
  password: 'Problem1'
};

describe('User Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeEach(async () => {
    await mongoseConnect(User);
  });

  afterEach(async () => {
    await mongoseDisconnect();
  });

  it('create & save user successfully', async () => {
    const savedUser = await saveModel(User, testData);

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser.id).toBeDefined();

    expect(savedUser.name).toBe(testData.name);

    expect(savedUser.email).toBe(testData.email);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User(testDataWithInvalidField);

    const savedUserWithInvalidField = await userWithInvalidField.save();

    expect(savedUserWithInvalidField.id).toBeDefined();

    expect(savedUserWithInvalidField.secret).toBeUndefined();
  });
});
