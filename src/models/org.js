/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config';

const orgSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    bio: String,
    address: String,
    country: String,
    state: String,
    localGov: String,
    cityTown: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

orgSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

orgSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

orgSchema.set('toJSON', {
  transform: (doc, {
    __v, _id, password, ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});

const Org = model('Org', orgSchema);

export default Org;
