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
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../features/user/userSlice";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

interface User {
  email: string;
  password: string;
  role: string;
}

type UserFind = Omit<User, "role">;

const account: User[] = [
  {
    email: "test@gmail.com",
    password: "Test123@",
    role: "user",
  },
  {
    email: "test000",
    password: "12345678",
    role: "admin",
  },
];

const nameRegex =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/m;
const passwordReg =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

const LoginPage = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();

  const findUser = (user: UserFind) => {
    return account.find(
      (_user) => _user.password === user.password && _user.email === user.email
    ) as User;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const user = {
      email: values.email as string,
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

  const [form] = Form.useForm();

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
            name="email"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="validate.required"
                    values={{
                      type: (
                        <span className="lowercase">
                          <FormattedMessage id="email" />
                        </span>
                      ),
                    }}
                  />
                ),
                // intl.formatMessage({
                //   id: "validate.required",
                // }),
              },
              {
                type: "email",
                message: (
                  <FormattedMessage
                    id="validate.isValid"
                    values={{
                      type: <FormattedMessage id="email" />,
                    }}
                  />
                ),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              allowClear
              autoComplete="email"
              size="large"
              placeholder={intl.formatMessage({ id: "email" })}
            />
          </Form.Item>
          {/* <Form.Item
            name="name"
            validateTrigger="onBlur"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    console.log(nameRegex.test(value));
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              allowClear
              autoComplete="name"
              size="large"
              placeholder="Name"
            />
          </Form.Item> */}
          <Form.Item
            name="password"
            validateFirst
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="validate.required"
                    key="password"
                    values={{
                      type: (
                        <span className="lowercase">
                          {intl.formatMessage({ id: "password" })}
                        </span>
                      ),
                    }}
                  />
                ),
              },
              {
                validator(_, value) {
                  if (passwordReg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    <FormattedMessage id="validate.formatPassword" />
                  );
                },
              },
              // ({ validateFields }) => ({
              //   validator(_, value) {
              //     validateFields({ dirty: true }).then();
              //   },
              // }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              autoComplete="current-password"
              size="large"
              type="password"
              placeholder={intl.formatMessage({ id: "password" })}
            />
          </Form.Item>
          <Form.Item className="flex-1">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <FormattedMessage id="login.rememberMe" />
              </Checkbox>
            </Form.Item>

            <a className="float-right text-[#1677ff]" href="">
              <FormattedMessage id="login.forgotPassword" />
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              <FormattedMessage id="login" />
            </Button>
            <FormattedMessage id="or" />{" "}
            <a className="text-[#1677ff]" href="">
              <FormattedMessage id="login.registerNow" />
            </a>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
export default LoginPage;
