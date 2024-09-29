import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

import HOC from "./components/Main/HOC.component.tsx";
import StoreProvider from "./context/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HOC>
        <App />
      </HOC>
    </StoreProvider>
  </React.StrictMode>
);
