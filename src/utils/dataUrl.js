import Datauri from 'datauri/parser';
import path from 'path';
import { uploader } from '../config';

const dUri = new Datauri();

export const dataUri = (req) => {
  const uri = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
  return uri;
};

export const processImageToUrl = async (req) => {
  const file = await dataUri(req).content;

  const { url } = await uploader.upload(file);

  return url;
};
