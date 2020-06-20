import React from "react";
import { Card, PageHeader, Skeleton } from "antd";
import { PostService } from "../../services";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { CommentOutlined } from "@ant-design/icons";
import { Comments } from "../Comments";
import { PostStore } from "../../store";
import { observer } from "mobx-react";

const store = PostStore;

type IProps = {} & RouteComponentProps;

interface IState {
  data?: any;
  commentVisible: boolean;
  loading: boolean;
}

const postApi = new PostService();

class PostDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: { _meta: {}, result: {} },
      commentVisible: false,
      loading: true,
    };
  }
  postId = this.props.match.params.id;

  setLoading(val) {
    this.setState({
      loading: val,
    });
  }

  async fetchPost() {
    try {
      this.setLoading(true);
      let postData = await postApi.getById(this.postId);
      this.setState({
        data: postData.data,
      });
      store.addPost(postData.data.result);
      this.setLoading(false);
    } catch {
      this.setLoading(false);
    }
  }

  componentDidMount() {
    this.fetchPost();
  }

  toggleComment = () => {
    this.setState((state) => ({ commentVisible: !state.commentVisible }));
  };

  render() {
    const { commentVisible, loading } = this.state;
    const { result } = this.state.data;
    const { Meta } = Card;
    return (
      <div>
        <PageHeader
          onBack={() => window.history.back()}
          title={`Post #${this.postId}`}
        />
        <Card
          style={{ marginBottom: 24 }}
          actions={[<CommentOutlined onClick={this.toggleComment} />]}
        >
          {loading ? (
            <Skeleton active />
          ) : (
            <Meta title={result?.title} description={result?.body} />
          )}
        </Card>

        {commentVisible && <Comments post_id={this.postId} />}
      </div>
    );
  }
}

export default withRouter(observer(PostDetail));
