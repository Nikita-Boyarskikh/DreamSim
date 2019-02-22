import { createMuiTheme } from '@material-ui/core';

export const mainColor = '#000000';

export const bgColor = '#ffffff';

export const secondaryBgColor = '#fafafa';

export const accentBgColor = '#f0f0f0';

export const textColor = '#ffffff';

export const textColorSecondary = '#999999';

export const font = '400 16px/23px Roboto, Helvetica, Arial, sans-serif';

export const fontHeader = '400 20px Roboto, Helvetica, Arial, sans-serif';

export const fontMonospace =
  '"Roboto Mono Light for Powerline", Monaco, "Courier New", Courier, monospace';

export default createMuiTheme({
  palette: {
    primary: {
      main:         mainColor,
      contrastText: textColor,
    },
    secondary: {
      main:         bgColor,
      contrastText: mainColor,
    },
    text:       { secondary: textColorSecondary },
    background: {},
  },
  typography: {
    useNextVariants: true,
    body1:           { fontSize: 16 },
    button:          { color: textColor },
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: mainColor,
        height:          'auto',
        justifyContent:  'center',
      },
    },
    MuiBottomNavigationAction: {
      selected: { color: textColor },
      root:     { color: textColorSecondary },
    },
  },
});
