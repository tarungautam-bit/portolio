import React from "react";
import ReactDOM from "react-dom/client";

import AppProviders from "./app/providers/AppProviders";
import AppRoutes from "./app/router/AppRoutes";

import "./index.css";
import { AudioProvider } from "./context/AudioContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <AppProviders>
        <AudioProvider>
            <AppRoutes />
        </AudioProvider>
    </AppProviders>
);