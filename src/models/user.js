/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config';

const userSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    gender: String,
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

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, {
    __v, _id, password, ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});

const User = model('User', userSchema);

export default User;
