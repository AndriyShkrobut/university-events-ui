import React from "react";
import { Col, Layout, Row } from "antd";

const AppLayout: React.FC = ({ children }) => (
  <Row justify={"center"}>
    <Col xs={24} sm={20} md={18}>
      <Layout>{children}</Layout>
    </Col>
  </Row>
);

export default AppLayout;
