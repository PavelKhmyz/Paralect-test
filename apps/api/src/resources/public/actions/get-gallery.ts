import { AppKoaContext, AppRouter } from 'types';
import publicService from '../public.service';

const handler = async (ctx: AppKoaContext) => {
  const response = await publicService.find({
    $and: [
      {
        public: true,
      },
    ],
  });
  ctx.body = response;
};

export default (router: AppRouter) => {
  router.get('/', handler);
};
