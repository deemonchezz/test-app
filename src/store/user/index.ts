import { decorate, observable, action, reaction } from "mobx";
import { UserService } from "../../services";
import { User } from "../../services/UserService";

const userApi = new UserService();

class UserStore {
  page = 1;
  data: { data?: { _meta?: any; result?: User[] } } = {};
  loading = true;

  setPage = (page: number) => {
    this.page = page;
  };

  setLoading = (val: boolean) => {
    this.loading = val;
  };

  setData = (data: any) => {
    this.data = data;
  };

  fetchUsers = async (page: number) => {
    console.log(page);
    try {
      this.setLoading(true);
      let userData = await userApi.getList({
        page,
      });
      this.setData(userData);
      this.setLoading(false);
    } catch {
      this.setLoading(false);
    }
  };

  onPageChange = reaction(
    () => this.page,
    (page) => this.fetchUsers(page),
  );
}

decorate(UserStore, {
  page: observable,
  data: observable,
  loading: observable,
  fetchUsers: action,
  setPage: action,
  setLoading: action,
  setData: action,
});

export default new UserStore();
