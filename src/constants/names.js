export const paths = {
  login_path: "/login",
  chat_path: "/chat",
};

export const REGEX = {
  username: new RegExp("^[a-z][a-z0-9_]*$"),
};

export const API = {
  server: "http://192.168.1.70:5000/",
  // add all the endpoints of API.
  checkConn: "",
  addUser: "add-user",
  user: "user",
  addGroup: "create-group",
};
