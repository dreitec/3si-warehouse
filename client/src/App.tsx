import React from "react";

import "./App.css";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { MainLayout } from './layouts';
import { theme } from "./theme";
import { RootStoreContext, rootStore } from './state/rootStore';


const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
};

export default App;
