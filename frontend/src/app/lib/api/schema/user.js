import { schema } from 'normalizr';


export const userSchema = new schema.Entity('users');
export const authKeySchema = new schema.Entity('authKey', {}, { idAttribute: 'key' });
