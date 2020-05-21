/* eslint-disable no-underscore-dangle */
import createApp from '../src/app';
import { User } from '../src/models';
import { mongoseConnect, mongoseDisconnect, userData } from './genaralTestConfi';

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
    const response = await request.post('/api/v1/auth/create-user').send(userData);
    expect(response.status).toBe(200);

    const user = await User.findOne({ email: 'team04@buidsdg.com' });

    expect(user.email).toBe('team04@buidsdg.com');
  });

  test('It should POST login User ', async () => {
    const response = await request.post('/api/v1/auth/login').send({
      email: 'lamido@gmail.com',
      password: 'Mypassword1234'
    });

    expect(response.statusCode).toBe(200);

    const user = await User.findOne({ email: 'lamido@gmail.com' });

    expect(user.email).toBe('lamido@gmail.com');
  });

  test('It should fail PATCH Unauthorize User ', async () => {
    const validUser = new User(userData);

    const savedUser = await validUser.save();

    const response = await request.patch(`/api/v1/auth/users/${savedUser._id}`).send({
      country: 'nigeria'
    });

    expect(response.statusCode).toBe(401);
  });
});
