import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";

const AppRoute: React.FC<{ header: boolean; footer: boolean }> = ({
  children,
  header = true,
  footer = true,
}) => {
  return (
    <React.Fragment>
      {header && <Header />}
      <Layout.Content>{children}</Layout.Content>
      {footer && <Footer />}
    </React.Fragment>
  );
};

export default AppRoute;
