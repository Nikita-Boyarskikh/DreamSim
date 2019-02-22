import moment from 'moment';

moment.defaultFormat = moment.defaultFormatUtc = 'YYYY-MM-DD HH:mm:ss';
moment.locale(window.navigator.language);

export const DEFAULT_LOCALE = 'ru-RU';

export const GUEST_USERNAME = 'guest';

export const GUEST_PASSWORD = '';
