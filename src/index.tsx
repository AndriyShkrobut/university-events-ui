import React from "react";
import ReactDOM from "react-dom";
import UserApi from "./api/user.api";
import Root from "components/root";

import "./index.less";

const root = document.getElementById("root");
const response = UserApi.getAll();
response.then((result) => {
  console.log(result.data);
});

if (root) {
  ReactDOM.render(<Root />, root);
}
