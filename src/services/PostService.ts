import API, { defaultParameters } from "./API";

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  _links: {
    self: {
      href: string;
    };
    edit: {
      href: string;
    };
  };
}

export class PostService {
  async getList(
    params = {},
  ): Promise<{ data: { _meta: any; result: Post[] } }> {
    return API.get("/posts", { params: { ...defaultParameters, ...params } });
  }

  async getById(
    id,
    params?: any,
  ): Promise<{ data: { _meta: any; result: Post[] } }> {
    return API.get(`/posts/${id}`, {
      params: { ...defaultParameters, ...params },
    });
  }
}
