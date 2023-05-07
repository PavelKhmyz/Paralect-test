import { AppKoaContext, AppRouter } from 'types';
import publicService from '../public.service';
import { ReqBody } from '../public.types';

const handler = async (ctx: AppKoaContext) => {
  const body = ctx.request.body as ReqBody;
  await publicService.deleteOne({ asset: body.asset });
  ctx.body = body;
};

export default (router: AppRouter) => {
  router.delete('/remove-asset', handler);
};
