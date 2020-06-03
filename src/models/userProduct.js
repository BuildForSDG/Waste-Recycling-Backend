/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const userProductSchema = new Schema(
  {
    quantity: String,
    location: String,
    imageUrl: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orgProduct: { type: Schema.Types.ObjectId, ref: 'OrgProduct' }
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
