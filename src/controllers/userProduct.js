import {
  userProductSchema, statusParamsSchema, validate
} from '../validation';
import { UserProduct, OrgProduct, ProductStatus } from '../models';
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
    orgProduct: productId,
    quantity,
    location,
    imageUrl
  });

  const productOrg = await OrgProduct.findById({ _id: productId });

  await productOrg.userProduct.push(product);
  await productOrg.save();

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

const userViewAllProducts = async (req, res) => {
  const userId = await getId(req);
  const product = await UserProduct.find({ userId });

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

const userViewProduct = async (req, res) => {
  const { productId } = req.params;

  const userId = await getId(req);

  const product = await UserProduct.find({ userId, _id: productId }).populate('orgProduct', '-userProduct');

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

const userViewProductRejectAccept = async (req, res) => {
  await validate(statusParamsSchema, req.params);
  const userId = await getId(req);

  const { status } = req.params;

  if (status === 'rejected') {
    const rejectedProduct = await ProductStatus.find({ status: 'rejected', userId });
    res.json({
      status: 'success',
      data: {
        message: 'Request send succesfully',
        rejectedProduct
      }
    });
  }
  const acceptedProduct = await ProductStatus.find({ status: 'accepted', userId });
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      acceptedProduct

    }
  });
};


export {
  userPostProduct, userViewAllProducts, userViewProduct, userViewProductRejectAccept as rejectAccept
};
