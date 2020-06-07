/* eslint-disable import/prefer-default-export */

import { getId } from '../config';
import { OrgProduct } from '../models';
import { Unauthorize } from '../errors';


const ViewAllProducts = async (req, res) => {
  const orgId = await getId(req);
  const view = await OrgProduct.find({ orgId }).populate('userProduct');

  res.json({
    status: 'success',
    data: {
      message: 'products retrieved succesfully',
      view
    }
  });
};

const viewOneProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await OrgProduct.find({ _id: productId });


  if (!product) {
    throw new Unauthorize('No product like this');
  }

  res.json({
    status: 'success',
    data: {
      message: 'product retrieved succesfully',
      product
    }
  });
};


export {
  ViewAllProducts, viewOneProduct
};
