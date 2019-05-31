import { __ } from 'app/lib/i18n';
import urls from 'app/constants/urls';

export const APP_NAME = 'Dream Sim';

export const firstMenuItems = [
  { name: __('Main'), url: urls.root },
];

export const lastMenuItems = [
  { name: __('Profile'), url: urls.profile },
  { name: __('Settings'), url: urls.settings },
];
