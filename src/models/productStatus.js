/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const productStatusSchema = new Schema(
  {
    status: String,
    pickUpDate: String,
    orgProduct: { type: Schema.Types.ObjectId, ref: 'OrgProduct' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userProduct: { type: Schema.Types.ObjectId, ref: 'UserProduct' }
  },
  {
    timestamps: true
  }
);

productStatusSchema.set('toJSON', {
  transform: (doc, {
    __v, _id, password, ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});

const ProductStatus = model('productStatus', productStatusSchema);

export default ProductStatus;
