import config from 'config';
import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import * as helpers from './cloud-storage.helper';
import multer from '@koa/multer';

const FirebaseApp = admin.initializeApp({
  credential: cert(config.cloudStorage.credentials),
  storageBucket: config.cloudStorage.storageBucket,
  databaseURL: config.cloudStorage.databaseURL,
});

const bucket = FirebaseApp.storage().bucket();

const upload = async (fileName: string, file: multer.File) => {
  const name = bucket.file(fileName);
  await name.save(file.buffer);

  name.makePublic((err, apiResponse) => {
    if (err) {
      console.log(err);
    }
    console.log('MAKE_PUBLIC:', apiResponse);
  });

  const url = name.publicUrl();

  return url;
};

const deleteObject = async (fileName: string) => {
  bucket.file(fileName).delete((err, apiResponse) => {
    console.log('RESPONSE:', apiResponse);
  });
};

export default {
  helpers,
  upload,
  deleteObject,
};
