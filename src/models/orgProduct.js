/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const orgProductSchema = new Schema(
  {
    orgId: String,
    name: String,
    category: String,
    minimunQuantity: String,
    maxQuantity: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

orgProductSchema.set('toJSON', {
  transform: (doc, {
    __v, _id, password, ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});

const OrgProduct = model('OrgProduct', orgProductSchema);

export default OrgProduct;
