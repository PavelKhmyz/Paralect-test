import multer from '@koa/multer';
import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import publicService from '../public.service';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, {
    global: 'File cannot be empty',
  });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const location = await cloudStorageService.upload(`gallery/${fileName}`, file);

  const newAsset = {
    asset: location,
    author: '',
    discription: '',
    name: '',
    public: false,
    like: [0, []],
    dislike: [0, []],
    owner: user._id,
  };

  await publicService.insertOne(newAsset);

  ctx.body = await publicService.findOne({ asset: location });
}

export default (router: AppRouter) => {
  router.post('/upload-asset', upload.single('file'), validator, handler);
};
