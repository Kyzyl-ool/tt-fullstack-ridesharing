import { createMuiTheme, Theme } from '@material-ui/core';
import { MainColor } from './MainColor';

export const MainTheme: Theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained'
      // disableFocusRipple: true,
      // disableRipple: true,
    }
  },
  overrides: {
    MuiTypography: {
      h3: {
        color: 'white'
      },
      h1: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      h2: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      h4: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      h5: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      h6: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      body1: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      },
      caption: {
        fontFamily: 'IBM Plex Sans, sans-serif'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'FAFAFA'
      }
    },
    MuiButton: {
      contained: {
        backgroundColor: MainColor[700],
        color: 'white',
        borderRadius: '24px'
      }
      // focusVisible: {
      //   backgroundColor: MainColor[400],
      //   color: 'white'
      // }
    }
  }
});
