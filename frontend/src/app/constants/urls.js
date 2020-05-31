import { include } from 'named-urls';

export default {
  root: '/',
  login: '/login',
  editor: '/editor',
  signup: '/signup',
  userAgreement: '/user-agreement',
  resetPassword: '/reset-password/:uid/:token',
  profile: '/profile',
  settings: '/settings',

  tools: include('/tools/', {
    optimizer: 'optimizer',
  }),

  api: include('/api/', {
    v1: include('v1/', {
      user: 'user/current/',
      auth: include('auth/', {
        login: 'login/',
        registration: 'registration/',
        logout: 'logout/',
      }),
      enums: include('enums/', {
        tools: 'tools/',
      }),
      scheme: include('scheme/', {
        chat: include('chat/', {
          unread: 'unread/',
          read: 'read/',
        }),
      }),
    }),
  }),
};
