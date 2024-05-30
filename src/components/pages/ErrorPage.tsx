import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {};

const ErrorPage = (props: Props) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <Flex className="h-screen" vertical align="center" justify="center">
      <Title level={2}>Oops!</Title>
      <Button onClick={() => navigate(-1)} type="primary">
        Go back
      </Button>
    </Flex>
  );
};
export default ErrorPage;
