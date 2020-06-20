import React from "react";
import { Pagination, PageHeader, Row } from "antd";
import { PostService } from "../../services";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Post from "./Post";

type IProps = {} & RouteComponentProps;

interface IState {
  data?: any;
  page: number;
}

const postApi = new PostService();

class PostList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
      page: 1,
    };
  }

  userId = this.props.match.params.userId;

  async fetchPosts() {
    try {
      let postData = await postApi.getList({
        page: this.state.page,
        user_id: this.userId || null,
      });
      this.setState({
        data: postData.data,
      });
    } catch {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchPosts();
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    const { data } = this.state;

    return (
      <>
        <PageHeader
          onBack={() => window.history.back()}
          title={`User #${this.userId} Post list`}
        />
        <Row>
          {data?.result.map(({ title, id }, key) => (
            <Post title={title} link={`/post/${id}`} key={id} imageId={key} />
          ))}
        </Row>

        <Pagination
          style={{ marginTop: 24 }}
          defaultCurrent={1}
          total={data?._meta?.totalCount}
          showSizeChanger={false}
          pageSize={20}
          onChange={(page) =>
            this.setState({
              page,
            })
          }
        />
      </>
    );
  }
}

export default withRouter(PostList);
