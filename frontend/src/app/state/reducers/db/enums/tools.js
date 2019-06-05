import { SET_TOOLS } from 'app/constants/actionTypes';
import { handleSetNormalizedData } from 'app/lib/api';
import { toolSchema } from 'app/lib/api/schema/enums/tools';

export default handleSetNormalizedData(SET_TOOLS, toolSchema);
