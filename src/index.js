import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//internationalization
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json";

//Redux
import { Provider } from "react-redux";
import reducerContainer from "./store/MessagesReducer/reducerContainer";
import { createStore, combineReducers } from "redux";
import reducerChat from "./store/ChatReducer/reducerChat";

import EvaConexion from "./services/eva/EvaConectionV4";

//store Redux
const rootReducer = combineReducers({
  messagesContainer: reducerContainer,
  chatApp: reducerChat,
});
const store = createStore(rootReducer);
console.log(store.getState());

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
  },
});

const connection = new EvaConexion();


ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <App connection={connection} />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
