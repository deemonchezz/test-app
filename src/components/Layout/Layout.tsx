import React from "react";
import { Layout as AntLayout, Menu, Badge } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { PostStore } from "../../store";
import { observer } from "mobx-react";

const { Sider, Content } = AntLayout;
type IProps = {} & RouteComponentProps;
const store = PostStore;

class Layout extends React.Component<IProps> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <AntLayout style={{ minHeight: "100vh" }}>
        <Sider
          style={{ background: "#fff" }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[this.props.location.pathname]}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}>
              <NavLink to="/users">Users</NavLink>
            </Menu.Item>

            <Menu.Item key="/viewed-posts" icon={<UserOutlined />}>
              <NavLink to="/viewed-posts">
                <Badge count={store.total} offset={[20, 7]}>
                  <div>Viewed posts</div>
                </Badge>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {" "}
            {this.props.children}
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
}

export default withRouter(observer(Layout));
