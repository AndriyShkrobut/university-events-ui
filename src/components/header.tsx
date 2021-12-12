import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Skeleton, Space } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

import useAuth from "hooks/use-auth";

import "./header.less";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isAdmin, logout, user } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  const avatarSrc = useMemo<string>(() => {
    if (!user || !user.image || !user.image.url) return "";

    return user.image.url;
  }, [user]);

  return (
    <Layout.Header className={"header"}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Link to={"/"}>
            <img
              src={"https://lnu.edu.ua/wp-content/themes/lnu-main/lib/images/logos/uk/main.svg"}
              alt={"Logo"}
            />
          </Link>
        </Col>
        <Col>
          {isLoading && (
            <Row justify={"end"} align={"middle"} className={"header__skeleton-row"}>
              <Col className={"header__skeleton-col"}>
                <Skeleton paragraph={false} avatar={{ shape: "circle" }} active />
              </Col>
            </Row>
          )}
          {isLoggedIn && !isLoading && (
            <Space size={"large"}>
              {isAdmin && (
                <Button type={"primary"} icon={<PlusOutlined />} onClick={handleCreateEvent}>
                  Створити подію
                </Button>
              )}
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
                <Avatar key={"avatar"} size={"large"} src={avatarSrc} icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          )}
          {!isLoggedIn && !isLoading && (
            <Button type={"primary"} onClick={handleLogin} icon={<UserOutlined />}>
              Увійти
            </Button>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
