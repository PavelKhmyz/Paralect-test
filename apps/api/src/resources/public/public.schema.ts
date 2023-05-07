import { z } from 'zod';

const gradeArray = z.array(z.string());

const schema = z
  .object({
    _id: z.string(),
    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    deletedOn: z.date().optional().nullable(),
    asset: z.string(),
    author: z.string(),
    discription: z.string(),
    name: z.string(),
    public: z.boolean(),
    like: z.tuple([z.number(), gradeArray]),
    dislike: z.tuple([z.number(), gradeArray]),
    owner: z.string(),
  })
  .strict();

export default schema;
