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
  const product = await UserProduct.find();

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

  const product = await UserProduct.findById(productId).populate('orgProduct', '-userProduct');

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

const userViewProductRejectAccept = async (req, res) => {
  const product = await UserProduct.find().populate('orgProduct', '-userProduct');

  const { status } = req.params;
  if (status === 'reject') {
    res.json({
      status: 'success',
      data: {
        message: 'Request send succesfully',
        product
      }
    });
  }

  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product

    }
  });
};


export {
  userPostProduct, userViewAllProducts, userViewProduct, userViewProductRejectAccept as rejectAccept
};
