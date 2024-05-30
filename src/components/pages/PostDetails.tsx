import { LoadingOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../type";

const PostDetails = () => {
  let { id } = useParams();
  const { data, loading } = useFetch<Post>(`/posts/${id}`);
  return (
    <Flex align="center" justify="center">
      {loading ? (
        <LoadingOutlined
          style={{
            fontSize: 50,
          }}
        />
      ) : (
        <Card title={data?.title} style={{ width: 300 }}>
          <p>{data?.body}</p>
        </Card>
      )}
    </Flex>
  );
};
export default PostDetails;
