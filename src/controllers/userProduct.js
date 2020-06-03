/* eslint-disable import/prefer-default-export */
import {
  userProductSchema, validate
} from '../validation';
import { UserProduct, OrgProduct } from '../models';
import { BadRequest } from '../errors';
import { getId } from '../config';
import { processImageToUrl } from '../utils';

const userPostProduct = async (req, res) => {
  await validate(userProductSchema, req.body);

  const { productId } = req.params;

  const { quantity, location } = req.body;

  const userId = await getId(req);

  const found = await OrgProduct.exists({ _id: productId });

  if (!found) {
    throw new BadRequest('Invalid id');
  }

  const imageUrl = await processImageToUrl(req);

  const product = await UserProduct.create({
    userId,
    productId,
    quantity,
    location,
    imageUrl
  });

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};


export {
  userPostProduct
};
