import React from "react";
import ReactDOM from "react-dom";

import Root from "components/root";

import "./index.less";

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(<Root />, root);
}
