import { AppKoaContext, AppRouter } from 'types';
import publicService from '../public.service';
import { ReqBody } from '../public.types';

const handler = async (ctx: AppKoaContext) => {
  const body = ctx.request.body as ReqBody;

  const query = { asset: body.asset };
  const updateDocument = {
    $set: {
      author: body.author,
      discription: body.discription,
      name: body.name,
      public: body.public,
      like: body.like,
      dislike: body.dislike,
    },
  };

  await publicService.atomic.updateOne(query, updateDocument);
  const response = await publicService.findOne(query);
  ctx.body = response;
};

export default (router: AppRouter) => {
  router.put('/update-asset', handler);
};
