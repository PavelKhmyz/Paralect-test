import { DATABASE_DOCUMENTS } from 'app.constants';
import db from 'db';
import schema from './public.schema';

const service = db.createService(DATABASE_DOCUMENTS.PUBLIC, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service);
