import multer from 'multer';

const storage = multer.memoryStorage();

export const multerUploadSingle = multer({ storage }).single('image');

export const multerUploadArray = multer({ storage }).array('photos', 12);
