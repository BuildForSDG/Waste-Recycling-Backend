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

export const userData = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  password: 'ProblemStatement2',
  passwordConfirmation: 'ProblemStatement2'
};

export const orgData = {
  email: 'team04@buidsdg.com',
  name: 'waste recycling',
  password: 'ProblemStatement2',
  passwordConfirmation: 'ProblemStatement2'
};
