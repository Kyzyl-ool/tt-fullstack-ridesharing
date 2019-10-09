import { createMuiTheme, Theme } from '@material-ui/core';
import { MainColor } from './MainColor';

export const MainTheme: Theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained',
      // disableFocusRipple: true,
      // disableRipple: true,
    },
  },
  overrides: {
    MuiTypography: {
      h3: {
        color: 'white',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'FAFAFA',
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: MainColor[700],
        color: 'white',
        borderRadius: '24px',
      },
      focusVisible: {
        backgroundColor: MainColor[400],
        color: 'white',
      },
    },
    MuiAvatar: {
      root: {
        maxHeight: '32px',
        maxWidth: '32px',
      },
    },
  },
});
