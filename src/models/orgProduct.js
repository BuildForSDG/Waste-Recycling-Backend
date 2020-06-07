/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const orgProductSchema = new Schema(
  {
    orgId: { type: Schema.Types.ObjectId, ref: 'OrgProduct' },
    name: String,
    category: String,
    minimumQuantity: String,
    maxQuantity: String,
    imageUrl: String,
    userProduct: [{ type: Schema.Types.ObjectId, ref: 'UserProduct' }]
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
