import API, { defaultParameters } from "./API";

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  email: string;
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

export default class CommentService {
  async getList(
    params = {},
  ): Promise<{ data: { _meta: any; result: Comment[] } }> {
    return API.get("/comments", {
      params: { ...defaultParameters, ...params },
    });
  }
}
