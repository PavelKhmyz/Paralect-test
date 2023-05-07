import { z } from 'zod';

import schema from './public.schema';

export enum TokenType {
  ACCESS = 'access',
}

export interface ReqBody {
  asset: string;
  author: string;
  discription: string;
  name: string;
  owner: string;
  like: [number, string[]];
  dislike: [number, string[]];
  public: boolean;
}

export type Token = z.infer<typeof schema>;
