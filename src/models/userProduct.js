/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const userProductSchema = new Schema(
  {
    UserId: String,
    productId: String,
    quantity: String,
    Location: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

userProductSchema.set('toJSON', {
  transform: (doc, {
    __v, _id, password, ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});

const UserProduct = model('UserProduct', userProductSchema);

export default UserProduct;
