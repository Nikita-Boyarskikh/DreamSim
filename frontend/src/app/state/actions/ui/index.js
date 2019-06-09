import { createAction } from 'redux-actions';
import { I18N_INIT, OPEN_ALERT, CLOSE_ALERT } from 'app/constants/actionTypes';
import { unlazy } from 'app/lib/utils';

export const i18nInit = createAction(I18N_INIT);

export const alert = createAction(OPEN_ALERT, (message, type='error') => ({ message: unlazy(message), type }));
export const closeAlert = createAction(CLOSE_ALERT);
