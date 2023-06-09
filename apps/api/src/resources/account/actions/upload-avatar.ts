import multer from '@koa/multer';

import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import { userService } from 'resources/user';

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

  if (user.avatarUrl) {
    const fileName = cloudStorageService.helpers.getFileName(user.avatarUrl);

    await cloudStorageService.deleteObject(`avatars/${fileName}`);
  }

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const location = await cloudStorageService.upload(`avatars/${fileName}`, file);

  const updatedUser = await userService.updateOne({ _id: user._id }, () => ({
    avatarUrl: location,
  }));

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.post('/avatar', upload.single('file'), validator, handler);
};
