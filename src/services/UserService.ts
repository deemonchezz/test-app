import API, { defaultParameters } from "./API";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  status: string;
  _links: {
    self: {
      href: string;
    };
    edit: {
      href: string;
    };
    avatar: {
      href: string;
    };
  };
}

export class UserService {
  async getList(
    params = {},
  ): Promise<{ data: { _meta: any; result: User[] } }> {
    return API.get("/users", { params: { ...defaultParameters, ...params } });
  }
}
