import http from "./index.js";

export let user;

const createUser = async (registerData) => {
  const res = await http.post("/register", registerData);
  user = res.data;
  console.log(user);
  return res;
};

const loginUser = async (loginData) => {
  const res = await http.post("/login", loginData);
  return res;
};

export { createUser, loginUser };
