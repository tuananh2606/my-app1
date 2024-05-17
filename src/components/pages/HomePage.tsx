import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Layout,
  Menu,
  theme,
  type MenuProps,
} from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { logOut } from "../../features/user/userSlice";
import useFetch from "../../hooks/useFetch";

const { Content, Sider } = Layout;

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: `option${subKey}`,
        label: `option${subKey}`,
      };
    }),
  };
});

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Meta } = Card;
  const posts = useFetch<IPost[]>("/posts");
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axiosHandler.get("/posts");
  //     console.log(res);

  //     return res;
  //   };
  //   fetchPosts();
  // }, []);

  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <Content style={{ padding: "0 48px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <FormattedMessage id="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        style={{
          padding: "24px 0",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={items2}
            onClick={(e) => console.log(navigate(e.key))}
          />
        </Sider>

        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          {location.pathname === "/" ? (
            <>
              <div className="flex items-center justify-between">
                <h3>{user.name}</h3>
                <Button type="primary" onClick={logout}>
                  <FormattedMessage id="logout" />
                </Button>
              </div>
              <div className="grid grid-cols-4">
                {user.username &&
                  posts &&
                  posts.length > 0 &&
                  posts.slice(0, 20).map((post) => (
                    <Card className="m-2">
                      <Meta title={post.title} description={post.body} />
                    </Card>
                  ))}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Content>
  );
};
export default HomePage;
