import { User } from '../src/models';
import {
  mongoseConnect, mongoseDisconnect, userData, saveModel
} from './genaralTestConfi';

const userDataWithInvalidField = {
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
    const savedUser = await saveModel(User, userData);

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser.id).toBeDefined();

    expect(savedUser.name).toBe(userData.name);

    expect(savedUser.email).toBe(userData.email);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User(userDataWithInvalidField);

    const savedUserWithInvalidField = await userWithInvalidField.save();

    expect(savedUserWithInvalidField.id).toBeDefined();

    expect(savedUserWithInvalidField.secret).toBeUndefined();
  });
});
