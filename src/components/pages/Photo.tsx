import { Card, Col, Image, Row, Skeleton } from "antd";
import useFetch from "../../hooks/useFetch";

interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnail: string;
}

const Photo = () => {
  const { data, loading } = useFetch<IPhoto[]>("/photos?_start=0&_limit=20");
  const { Meta } = Card;

  console.log(loading);

  return (
    <Row gutter={[16, 16]}>
      {!loading
        ? data &&
          data.length > 0 &&
          data.slice(0, 20).map((photo, idx) => (
            <Col key={idx} span={6}>
              <Card
                hoverable
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
                cover={<Image className="w-full h-full" src={photo.url} />}
                className="p-0 rounded-lg bg-[rgb(240,_242,_245)]"
                style={{ width: 300 }}
              >
                <Meta
                  className="p-2"
                  title={photo.title}
                  description="www.instagram.com"
                />
              </Card>
            </Col>
          ))
        : Array.from({ length: 8 }).map((item, idx) => (
            <Col key={idx} span={6}>
              <Skeleton.Image
                style={{ width: 300, height: 300 }}
                key={idx}
                active
              />
            </Col>
          ))}
    </Row>
  );
};
export default Photo;
