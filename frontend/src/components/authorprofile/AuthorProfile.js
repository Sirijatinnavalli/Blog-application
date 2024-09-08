import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import LoginProvider, {
  loginContext,
} from "../../contexts/LoginContextProvider";

function AuthorProfile() {
  console.log("author profile :", useContext(loginContext));
  return (
    <div>
      <ul className="nav justify-content-around p-3 fs-2 mt-5">
        <li className="nav-item">
          <NavLink className="nav-link text-primary" to="add-article">
            Add article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-primary" to="article-of-author">
            Articles of author
          </NavLink>
        </li>
      </ul>
     
        <Outlet context={useContext(loginContext)} />
    
    </div>
  );
}

export default AuthorProfile;