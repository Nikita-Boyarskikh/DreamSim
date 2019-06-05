import { schema } from 'normalizr';
import { elementSchema } from './element';


export const schemeSchema = new schema.Entity('schemes', {
  elements: [elementSchema]
});
