import { schema } from 'normalizr';


export const toolSchema = new schema.Entity('tool');
export const toolsSchema = new schema.Array(toolSchema);
