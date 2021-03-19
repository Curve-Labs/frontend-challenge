import React, { Suspense } from "react";
import { Routes } from "./routes";
import { Spin } from "antd";
import "./App.css";

function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <Routes />
    </Suspense>
  );
}

export default App;
