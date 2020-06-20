import React from "react";
import { PageHeader, Row, Button } from "antd";
import Post from "./Post";
import { PostStore } from "../../store";
import { observer } from "mobx-react";
import { Modal } from "antd";

const store = PostStore;
const { confirm } = Modal;

class PostViewed extends React.Component {
  showConfirm() {
    confirm({
      title: "Do you Want to clear all items?",
      onOk() {
        store.reset();
      },
    });
  }

  render() {
    const { posts, total } = store;

    return (
      <>
        <PageHeader
          onBack={() => window.history.back()}
          title={`Viewed posts list`}
          extra={[
            !!total && (
              <Button type="primary" onClick={this.showConfirm}>
                Clear
              </Button>
            ),
          ]}
        />

        <Row>
          {total
            ? posts?.map(({ title, id }, key) => (
                <Post
                  title={title}
                  link={`/post/${id}`}
                  key={id}
                  imageId={key}
                />
              ))
            : "no posts"}
        </Row>
      </>
    );
  }
}

export default observer(PostViewed);
