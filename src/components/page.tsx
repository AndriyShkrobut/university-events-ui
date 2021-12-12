import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";

export type PageProps = { header?: boolean; footer?: boolean };

const Page: React.FC<PageProps> = ({ children, header = true, footer = true }) => {
  return (
    <React.Fragment>
      {header && <Header />}
      <Layout.Content>{children}</Layout.Content>
      {footer && <Footer />}
    </React.Fragment>
  );
};

export default Page;
