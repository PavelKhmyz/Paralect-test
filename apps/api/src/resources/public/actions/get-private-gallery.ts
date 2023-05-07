import { AppKoaContext, AppRouter } from 'types';
import publicService from '../public.service';

const handler = async (ctx: AppKoaContext) => {
  const url = ctx.URL.pathname.split('/');
  const id = url[url.length - 1];
  const response = await publicService.find({
    $and: [
      {
        owner: id,
      },
    ],
  });
  ctx.body = response;
};

export default (router: AppRouter) => {
  router.get('/private-gallery/:id', handler);
};
