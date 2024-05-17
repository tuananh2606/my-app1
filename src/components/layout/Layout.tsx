import { Layout as LayoutAnt, Menu, type MenuProps } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Footer } = LayoutAnt;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <FormattedMessage id="home" />,
    key: "/",
  },
  {
    label: <FormattedMessage id="login" />,
    key: "/login",
  },
];

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <LayoutAnt className="min-h-screen">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={items}
          onClick={(e) => console.log(navigate(e.key))}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Outlet />
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </LayoutAnt>
  );
};
export default Layout;
