import React from "react";
import { Card } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserList, PostList, PostDetail, PostViewed } from "./components";
import Layout from "./components/Layout/Layout";

class App extends React.Component {
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
      <Router>
        <Layout>
          <Card>
            <Switch>
              <Route exact path="/">
                <h1>Test App</h1>
              </Route>
              <Route exact path="/users">
                <UserList />
              </Route>
              <Route path="/users/:userId/posts">
                <PostList />
              </Route>
              <Route path="/post/:id">
                <PostDetail />
              </Route>
              <Route path="/viewed-posts">
                <PostViewed />
              </Route>
            </Switch>
          </Card>
        </Layout>
      </Router>
    );
  }
}

export default App;
