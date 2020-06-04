/* eslint-disable import/prefer-default-export */
import {
  postStatuschema, validate
} from '../validation';
import { UserProduct, OrgProduct, ProductStatus } from '../models';
import { BadRequest } from '../errors';

const acceptRejectUserProduct = async (req, res) => {
  await validate(postStatuschema, req.body);

  const { productId } = req.params;

  const { status, pickUpDate } = req.body;

  const found = await UserProduct.exists({ _id: productId });

  if (!found) {
    throw new BadRequest('Invalid id');
  }

  const userProduct = await UserProduct.findById({ _id: productId }).select('orgProduct userId');
  const orgProductId = userProduct.orgProduct;
  const { userId } = userProduct;
  const orgProduct = await OrgProduct.findById({ _id: orgProductId }).select('id');

  const productStatus = await ProductStatus.create(
    {
      status,
      pickUpDate,
      orgProduct,
      userId,
      userProduct
    }
  );

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      productStatus
    }
  });
};


export {
  acceptRejectUserProduct
};
