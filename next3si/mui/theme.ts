import { createTheme } from "@mui/material/styles";
import palette from "./colors";

export const theme = createTheme({
  palette,
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
        outlined: {
          backgroundColor: "#E6EFFF",
          border: "none",
          "&:hover": {
            border: "none",
          },
        },
      },
    },
  },
});
