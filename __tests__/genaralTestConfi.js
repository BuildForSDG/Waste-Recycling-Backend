import mongoose from 'mongoose';
import { MONGO_URI, MONGO_OPTIONS } from '../src/config';

export const mongoseConnect = async (User) => {
  const connect = await mongoose.connect(MONGO_URI, MONGO_OPTIONS, (err) => {
    if (err) {
      process.exit(1);
    }
  });
  await User.deleteMany({ email: 'team04@buidsdg.com' });
  return connect;
};

export const mongoseDisconnect = async () => {
  const disconnect = await mongoose.connection.close();
  return disconnect;
};

export const userData = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  password: 'ProblemStatement2',
  passwordConfirmation: 'ProblemStatement2'
};
