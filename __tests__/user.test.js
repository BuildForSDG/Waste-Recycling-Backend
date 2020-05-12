import mongoose from 'mongoose';
import createApp from '../src/app';
import { MONGO_URI, MONGO_OPTIONS } from '../src/config';
import { User } from '../src/models';

const supertest = require('supertest'); // Link to your server file

const app = createApp();

const request = supertest(app);

describe('Test the User Routes', () => {
  const userData = {
    email: 'team04@buidsdg.com',
    name: 'waste recycling',
    password: 'ProblemStatement2',
    passwordConfirmation: 'ProblemStatement2'
  };

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


  test('It should POST New User ', async () => {
    const response = await request.post('/api/v1/auth/create-user').send(userData);
    expect(response.status).toBe(200);

    const user = await User.findOne({ email: 'team04@buidsdg.com' });

    expect(user.email).toBe('team04@buidsdg.com');
  });
});
