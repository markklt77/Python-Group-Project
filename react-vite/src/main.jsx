import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { router } from "./router";
import React from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./redux/store";
import * as sessionActions from "./redux/session";
import * as songActions from "./redux/songs"
import * as albumActions from "./redux/albums"
import * as playlistActions from "./redux/playlists"
import LoadingProvider from "./context/LoadingContext";
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.songActions = songActions;
  window.albumActions = albumActions;
  window.playlistActions = playlistActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </ReduxProvider>
  </React.StrictMode>
);
