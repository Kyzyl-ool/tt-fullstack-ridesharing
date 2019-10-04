import {createMuiTheme} from "@material-ui/core";

export const AboutTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body2: {
        color: 'white'
      }
    },
    MuiButton: {
      text: {
        color: "white",
      }
    }
  }
})
