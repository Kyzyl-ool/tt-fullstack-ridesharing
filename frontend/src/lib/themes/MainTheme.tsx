import {createMuiTheme, Theme} from "@material-ui/core";
import {MainColor} from "./MainColor";



const theme: Theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: "contained",
      // disableFocusRipple: true,
      // disableRipple: true,
    }
  },
  overrides: {
    MuiTypography: {
      h3: {
        color: 'white',
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: MainColor[400],
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: MainColor[700],
        color: "white",
      },
      focusVisible: {
        backgroundColor: MainColor[400],
        color: 'white',
      },
    }
  }
})


export default theme
