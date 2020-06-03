/* eslint-disable import/prefer-default-export */
import {
  orgProductSchema, validate
} from '../validation';
import { OrgProduct } from '../models';
import { getId } from '../config';
import { processImageToUrl } from '../utils';

const orgPostProduct = async (req, res) => {
  await validate(orgProductSchema, req.body);
  const {
    name, category, minimumQuantity, maxQuantity
  } = req.body;

  const orgId = await getId(req);

  const imageUrl = await processImageToUrl(req);

  const product = await OrgProduct.create({
    orgId,
    name,
    category,
    minimumQuantity,
    maxQuantity,
    imageUrl
  });

  res.json({
    status: 'success',
    data: {
      message: 'Product created successfully',
      product
    }
  });
};

export {
  orgPostProduct
};
