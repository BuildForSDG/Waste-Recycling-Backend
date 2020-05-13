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
});
