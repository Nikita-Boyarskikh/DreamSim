import moment from 'moment';

import { DEFAULT_FORMAT } from 'app/constants/locales';

moment.defaultFormat = moment.defaultFormatUtc = DEFAULT_FORMAT;
moment.locale(window.navigator.language);

export default moment;
