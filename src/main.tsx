import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GridContextProvider from "./context/GridContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GridContextProvider>
            <App />
        </GridContextProvider>
    </React.StrictMode>
);
