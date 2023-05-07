import { routeUtil } from 'utils';
import getGallery from './actions/get-gallery';
import deleteAsset from './actions/delete-asset';
import updatePublic from './actions/update-public';
import uploadAsset from './actions/upload-asset';
import getPrivateGallery from './actions/get-private-gallery';

const publicRoutes = routeUtil.getRoutes([getGallery]);

const privateRoutes = routeUtil.getRoutes([
  getPrivateGallery,
  deleteAsset,
  updatePublic,
  uploadAsset,
  getPrivateGallery,
]);

export default {
  publicRoutes,
  privateRoutes,
};
