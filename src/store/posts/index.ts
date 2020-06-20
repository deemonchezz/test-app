import { decorate, observable, action, computed, toJS } from "mobx";
import { message } from "antd";
import { Post } from "../../services/PostService";

class PostsStore {
  posts: Post[] = [];

  get total() {
    return this.posts.length;
  }

  addPost(post: any) {
    if (!toJS(this.posts).find((item) => item.id === post.id)) {
      this.posts.push(post);
    }
  }

  reset() {
    this.posts = [];
    message.success("Posts successfully cleared");
  }
}

decorate(PostsStore, {
  posts: observable,
  addPost: action,
  reset: action,
  total: computed,
});

export default new PostsStore();
