import React from "react";
import { Pagination, List, Comment } from "antd";
import { CommentService } from "../../services";
import { observer } from "mobx-react";

type IProps = {
  post_id: string;
};

interface IState {
  data?: any;
  page: number;
}

const commentsApi = new CommentService();

class Comments extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
      page: 1,
    };
  }

  post_id = this.props.post_id;

  async fetchComments() {
    try {
      let commentData = await commentsApi.getList({
        page: this.state.page,
        post_id: this.post_id || null,
      });
      this.setState({
        data: commentData.data,
      });
    } catch {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchComments();
    }
  }

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    const { data } = this.state;

    return (
      <>
        <List
          className="comment-list"
          header={`${data?.result?.length || 0} replies`}
          itemLayout="horizontal"
          dataSource={data?.result}
          renderItem={(item: any) => (
            <li>
              <Comment
                author={item.name}
                avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                content={item.body}
              />
            </li>
          )}
        />

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

export default observer(Comments);
