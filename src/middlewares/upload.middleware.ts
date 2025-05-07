// src/middlewares/upload.middleware.ts

import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Carpeta de destino
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, '-');
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// Filtro de tipos
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (/^image\//.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo imágenes permitidas'));
  }
};

export const upload = multer({ storage, fileFilter });
