import { createTheme } from "@mui/material";

const muiTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00ADB5",
      },
      secondary: {
        main: "#393E46",
      },
      background: {
        default: "#222831",
        paper: "#222831",
      },
      text: {
        primary: "#EEEEEE",
        secondary: "#EEEEEE",
      },
    },
  });

export default muiTheme;
