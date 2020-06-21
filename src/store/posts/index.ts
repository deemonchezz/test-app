import { decorate, observable, action, computed, reaction, toJS } from "mobx";
import { message } from "antd";
import { Post } from "../../services/PostService";

const localPosts = JSON.parse(localStorage?.getItem("posts") || "null");
class PostsStore {
  posts: Post[] = localPosts || [];

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

  onChange = reaction(
    () => this.total,
    () => localStorage.setItem("posts", JSON.stringify(this.posts)),
  );
}

decorate(PostsStore, {
  posts: observable,
  addPost: action,
  reset: action,
  total: computed,
});

export default new PostsStore();
