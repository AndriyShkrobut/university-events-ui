import React from "react";
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import useAuth from "hooks/use-auth";

const Header: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <Layout.Header>
      <Row justify={"space-between"}>
        <Col>
          <Typography.Link>Logo</Typography.Link>
        </Col>
        <Col>
          {isLoggedIn ? (
            <Dropdown
              arrow
              placement={"bottomCenter"}
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item key={"my-profile"}>Мій профіль</Menu.Item>
                  <Menu.Item key={"logout"} onClick={logout}>
                    Вийти
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar key={"avatar"} icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Button type={"primary"} onClick={login} icon={<UserOutlined />}>
              Увійти
            </Button>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
