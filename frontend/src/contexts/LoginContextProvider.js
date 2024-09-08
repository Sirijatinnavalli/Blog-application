
import { createContext, useState } from "react";
import axios from "axios";

//create context obj
export const loginContext = createContext();

function LoginProvider({ children }) {
  let [currentUserDetails, setCurrentUserDetails] = useState({
    userLoginStatus: false,
    currentUser: {},
    err: "",
  });

  async function loginUser(credObj) {
    if (credObj.role === "user") {
      let res = await axios.post(
        "http://localhost:4000/user-api/login",
        credObj
      );

      console.log(res);
      if (res.data.message === "login success") {
        //navigate to user profile
        console.log("user logged in");
        setCurrentUserDetails({
          ...currentUserDetails,
          currentUser: res.data.user,
          userLoginStatus: true,
        });
      } else {
        setCurrentUserDetails({
          ...currentUserDetails,
          err: res.data.message,
          userLoginStatus: false,
          currentUser: {},
        });
      }
    }
  }

  return (
    <loginContext.Provider value={{ currentUserDetails, setCurrentUserDetails, loginUser }}>
      {children}
    </loginContext.Provider>
  );
}

export default LoginProvider;