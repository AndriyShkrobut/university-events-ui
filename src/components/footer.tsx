import React from "react";
import { Button, Col, Input, Layout, Row } from "antd";

const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <Row justify={"end"}>
        <Col>
          <Input.Group compact>
            <Input placeholder={"example@example.com"} style={{ width: 200 }} />
            <Button type={"primary"}>Підписатися</Button>
          </Input.Group>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
