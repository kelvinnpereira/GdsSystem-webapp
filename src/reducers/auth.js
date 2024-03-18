import cookieCutter from "cookie-cutter";

const initialState = { token: "", username: "", };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("Authorization", `${auth.token}`, { path: "/" });
      cookieCutter.set("username", auth.username, { path: "/" });
      return {
        token: auth.token,
        username: auth.username,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("username", "", { expires: new Date(0) });
      return {
        token: null,
        username: null,
      };
    case "RESTORE":
      return {
        token: cookieCutter.get("Authorization"),
        username: cookieCutter.get("username"),
      };
    default:
      return state;
  }
};

export default auth;