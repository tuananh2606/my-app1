import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout as LayoutAnt,
  Menu,
  Select,
  Space,
  type MenuProps,
} from "antd";
import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { logOut } from "../../features/user/userSlice";
import { LocaleContext } from "../LocaleContext";

const { Header, Footer } = LayoutAnt;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <FormattedMessage id="home" />,
    key: "/",
  },
];

const itemDDs: MenuProps["items"] = [
  {
    key: "logout",
    label: "Logout",
  },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { locale, setLocale } = useContext(LocaleContext);
  const handleChange = (value: string) => {
    localStorage.setItem("language", value);
    setLocale(value);
  };

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <LayoutAnt className="min-h-screen">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={(e) => console.log(navigate(e.key))}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Select
          className="min-w-16"
          defaultValue={locale}
          onChange={handleChange}
          options={[
            { value: "en", label: "en" },
            { value: "vi", label: "vi" },
          ]}
        />
        {user.name ? (
          <Dropdown
            menu={{ items: itemDDs, onClick: handleClick }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  size={36}
                  className="ml-2"
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {user.name.charAt(0)}
                </Avatar>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            icon={<UserOutlined className="mr-1" />}
            className="ml-2"
            type="primary"
            size="middle"
          >
            <FormattedMessage id="login" />
          </Button>
        )}
      </Header>
      <Outlet />
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </LayoutAnt>
  );
};
export default Layout;
