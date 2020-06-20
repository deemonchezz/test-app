import axios from "axios";

export default axios.create({
  baseURL: "https://gorest.co.in/public-api",
  responseType: "json",
});

export const defaultParameters = {
  _format: "json",
  "access-token": "p_Bi48gEv1uJOKWRukLjpYayATsUYgFvQcBV",
};
