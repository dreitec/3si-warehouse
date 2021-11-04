import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "mapbox-gl/dist/mapbox-gl.css";

import { MainLayout } from "./layouts";
import { theme } from "./theme";
import { RootStoreContext, rootStore } from "./state/rootContext";
import { Homepage } from "./Pages";
import "./App.css";

const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Homepage />
        </MainLayout>
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
};

export default App;
