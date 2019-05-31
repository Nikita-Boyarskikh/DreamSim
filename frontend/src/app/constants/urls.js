import { include } from 'named-urls';

export default {
  root: '/',
  login: '/login',
  editor: '/editor',
  signup: '/signup',
  userAgreement: '/user-agreement',
  resetPassword: '/reset-password',
  profile: '/profile',
  settings: '/settings',
  logout: '/logout',

  tools: include('/tools/', {
    optimizer: 'optimizer'
  }),

  api: include('/api/', {
    v1: include('v1/', {
      login: 'login/',
      signup: 'signup/',
      enums: include('enums/', {
        tools: 'tools/'
      })
    }),
  }),
};
