import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

import { ThemeProvider, StyleSheetManager } from "styled-components";
import WS10Theme from "@uk-source-web/theme-ws10";
import isPropValid from "@emotion/is-prop-valid";

import HOC from "./components/Main/HOC.component.tsx";
import StoreProvider from "./context/StoreProvider.tsx";

WS10Theme.setBaseAssetLocation("https://oneportal.vodafone.com/cdn/source-web/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={isPropValid} enableVendorPrefixes>
      <ThemeProvider theme={WS10Theme}>
        <WS10Theme.globalStyles />
        <StoreProvider>
          <HOC>
            <App />
          </HOC>
        </StoreProvider>
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>
);
