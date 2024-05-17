import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
} from "antd";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../features/user/userSlice";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface User {
  username: string;
  password: string;
  role: string;
}

type UserFind = Omit<User, "role">;

const account: User[] = [
  {
    username: "test123",
    password: "12345678",
    role: "user",
  },
  {
    username: "test000",
    password: "12345678",
    role: "admin",
  },
];

const LoginPage = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findUser = (user: UserFind) => {
    return account.find(
      (_user) =>
        _user.password === user.password && _user.username === user.username
    ) as User;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const user = {
      username: values.username as string,
      password: values.password as string,
    };
    const { password, ...userFound } = findUser(user);
    if (userFound) {
      dispatch(
        signIn({
          ...userFound,
          name: "Test",
        })
      );
      navigate("/");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Flex
      align="center"
      justify="center"
      className="w-full relative h-screen bg-black"
    >
      <img
        className="w-full absolute h-full object-cover"
        alt="avatar"
        src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill"
      />
      <Card
        title={
          <Title level={2}>
            <FormattedMessage id="login" />
          </Title>
        }
        className="flex flex-col justify-center items-center w-1/3"
        styles={{
          header: {
            margin: "8px 0",
            fontSize: "1.5rem",
            textAlign: "center",
            width: "100%",
          },
          body: {
            width: "100%",
          },
        }}
      >
        <Form
          name="login-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col"
        >
          <Form.Item
            name="username"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 6 },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              allowClear
              autoComplete="username"
              size="large"
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              autoComplete="current-password"
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="flex-1">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="float-right text-[#1677ff]" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log in
            </Button>
            Or{" "}
            <a className="text-[#1677ff]" href="">
              register now!
            </a>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
export default LoginPage;
