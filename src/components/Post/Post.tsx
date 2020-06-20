import React from "react";
import { Card } from "antd";
import {
  ArrowRightOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Post.css";

type Props = {
  title: string;
  body?: string;
  link: string;
  imageId: number;
};

interface IState {
  imgLoaded?: boolean;
  randomImageIndex?: number;
}

class Post extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imgLoaded: false,
    };
  }
  render() {
    const { title, body, link, imageId } = this.props;
    const { imgLoaded } = this.state;
    const { Meta } = Card;
    return (
      <Card
        style={{ marginBottom: 24, marginRight: 24, width: 300 }}
        cover={
          <Link to={link} style={{ display: "block" }}>
            <div
              className={`post-image ${imgLoaded ? "post-image--loaded" : ""}`}
            >
              <img
                alt="example"
                src={`https://picsum.photos/id/${imageId}/300/200`}
                onLoad={() => this.setState({ imgLoaded: true })}
              />
            </div>
          </Link>
        }
        actions={[
          <Link to={link}>
            <ArrowRightOutlined />
          </Link>,
          <ShareAltOutlined />,
          <EllipsisOutlined />,
        ]}
      >
        <Meta title={title} description={body} />
      </Card>
    );
  }
}

export default Post;
