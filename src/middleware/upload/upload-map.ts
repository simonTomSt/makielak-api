import { FileType } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images');
  },
  filename: (_req, file, cb) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
});

export const uploadMap = {
  [FileType.IMAGE]: multer({
    storage: imageStorage,
    fileFilter: (_req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Wrong image data'));
    },
  }),
  [FileType.PDF]: multer({
    dest: 'public/pdf',
    fileFilter: (_req, file, cb) => {
      const fileTypes = /pdf/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Wrong data'));
    },
  }),
};
