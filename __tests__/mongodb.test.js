/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { MONGO_URI, MONGO_OPTIONS } from '../src/config';
import { User } from '../src/models';

const userData = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  password: 'Problem1'
};

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
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS, (err) => {
      if (err) {
        process.exit(1);
      }
    });
    await User.deleteMany({ email: 'team04@buidsdg.com' });
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('create & save user successfully', async () => {
    const validUser = new User(userData);

    const savedUser = await validUser.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();

    expect(savedUser.name).toBe(userData.name);

    expect(savedUser.email).toBe(userData.email);

    expect(savedUser.loginUsing).toBe(userData.loginUsing);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User(userDataWithInvalidField);

    const savedUserWithInvalidField = await userWithInvalidField.save();

    expect(savedUserWithInvalidField._id).toBeDefined();

    expect(savedUserWithInvalidField.secret).toBeUndefined();
  });
});
