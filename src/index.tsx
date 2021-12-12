import React from "react";
import ReactDOM from "react-dom";
import Root from "components/root";

import "./index.less";
import { notification } from "antd";

const root = document.getElementById("root");

if (root) {
  notification.config({ placement: "bottomRight" });
  ReactDOM.render(<Root />, root);
}
