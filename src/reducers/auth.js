import cookieCutter from "cookie-cutter";

const initialState = { token: "", user_name: "", };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("Authorization", `${auth.token}`, { path: "/" });
      cookieCutter.set("user_name", auth.user_name, { path: "/" });
      return {
        token: auth.token,
        user_name: auth.user_name,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("user_name", "", { expires: new Date(0) });
      return {
        token: null,
        user_name: null,
      };
    case "RESTORE":
      return {
        token: cookieCutter.get("Authorization"),
        user_name: cookieCutter.get("user_name"),
      };
    default:
      return state;
  }
};

export default auth;