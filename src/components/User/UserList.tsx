import React from "react";
import { List, Avatar, Pagination, Skeleton, PageHeader, Button } from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { UserStore } from "../../store";
import { observer } from "mobx-react";
import { toJS } from "mobx";

type IProps = {} & RouteComponentProps;
const store = UserStore;

class UserList extends React.Component<IProps> {
  componentDidMount() {
    if (!Object.entries(store.data).length) store.fetchUsers(store.page);
  }

  render() {
    const { match } = this.props;
    const { page, setPage, data, loading } = store;
    const userData = toJS(data)?.data;

    const Pages: React.FC<{ style: object }> = ({ style }) => {
      return (
        <Pagination
          style={style}
          defaultCurrent={page}
          total={userData?._meta?.totalCount}
          showSizeChanger={false}
          pageSize={20}
          onChange={(page) => setPage(page)}
        />
      );
    };

    return (
      <>
        <PageHeader
          onBack={() => window.history.back()}
          title={`Users list`}
          subTitle={`users (${userData?._meta?.totalCount || 0})`}
        />
        <Pages style={{ marginBottom: 24 }} />

        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={userData?.result}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Link
                  to={`${match.url}/${item.id}/posts`}
                  key="list-loadmore-edit"
                >
                  <Button type="primary" icon={<ArrowRightOutlined />}>
                    Show posts
                  </Button>
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      // src={item._links.avatar.href}
                      icon={<UserOutlined />}
                    />
                  }
                  title={
                    <b>
                      {item.first_name} {item.last_name}
                    </b>
                  }
                  description={item.address}
                />
              </Skeleton>
            </List.Item>
          )}
        />
        <Pages style={{ marginTop: 24 }} />
      </>
    );
  }
}

export default withRouter(observer(UserList));
