import React from "react";
import { Layout, Typography } from "antd";

const App: React.FC = () => {
  return (
    <Layout>
      <Layout.Header>
        <Typography.Link>Logo</Typography.Link>
      </Layout.Header>
      <Layout.Content>
        <Typography.Title>Hello World!</Typography.Title>
      </Layout.Content>
    </Layout>
  );
};

export default App;
