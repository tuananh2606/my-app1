import { LaptopOutlined } from "@ant-design/icons";
import { Card, Empty, Flex, Layout, Menu, theme, type MenuProps } from "antd";
import { FormattedMessage, FormattedPlural } from "react-intl";
import { useSelector } from "react-redux";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { axiosHandler } from "../../App";
import { RootState } from "../../app/store";
import { Post } from "../../type";

const { Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <LaptopOutlined />,
    children: [
      {
        key: "/photos",
        label: "Photos",
      },
      {
        key: "g2",
        label: "Item 2",
      },
    ],
  },
];

export async function loader() {
  const posts = await axiosHandler.get<Post[]>("/posts");
  return posts;
}

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  let location = useLocation();

  const { data } = useLoaderData() as { data: Post[] };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Meta } = Card;
  // const posts = useFetch<IPost[]>("/posts");
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axiosHandler.get("/posts");
  //     console.log(res);

  //     return res;
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <Layout>
      <Layout>
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={items}
            onClick={(e) => console.log(navigate(e.key))}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 0" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {location.pathname === "/" ? (
              <>
                {user.email ? (
                  <>
                    <h1>
                      {data.length}{" "}
                      <FormattedPlural
                        value={1}
                        one={<FormattedMessage id="post" />}
                        other={<FormattedMessage id="posts" />}
                      />
                    </h1>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-2 ">
                      {data &&
                        data.length > 0 &&
                        data.slice(0, 20).map((post, idx) => (
                          <Card
                            key={idx}
                            className="m-2"
                            onClick={() => navigate(`/post/${post.id}`)}
                          >
                            <Meta title={post.title} description={post.body} />
                          </Card>
                        ))}
                    </div>
                  </>
                ) : (
                  <Flex justify="center" align="center" className="h-full ">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Flex>
                )}
              </>
            ) : (
              <Outlet />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default HomePage;
