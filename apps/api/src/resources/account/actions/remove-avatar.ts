import { cloudStorageService } from 'services';
import { AppKoaContext, Next, AppRouter } from 'types';
import { userService } from 'resources/user';

async function validator(ctx: AppKoaContext, next: Next) {
  const { user } = ctx.state;

  ctx.assertClientError(user.avatarUrl, {
    global: "You don't have avatar",
  });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const fileName = cloudStorageService.helpers.getFileName(user.avatarUrl || '');

  const [updatedUser] = await Promise.all([
    userService.updateOne({ _id: user._id }, () => ({ avatarUrl: null })),
    cloudStorageService.deleteObject(fileName),
  ]);

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.delete('/avatar', validator, handler);
};
