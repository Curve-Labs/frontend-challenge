import React from "react";
import ReactDOM from "react-dom";
import "./style.min.css";
import Routes from "./Routes";
import reduxstore from "./methods/redux";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import ThemeWrapper from "./pages/components/ThemeWrapper";

let store = undefined;

reduxstore().then((value) => {
  store = value;

  ReactDOM.render(
    <Provider store={store}>
      <ThemeWrapper>
        <Routes />
      </ThemeWrapper>
    </Provider>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
