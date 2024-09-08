
import "./App.css";

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from "./components/home/Home"
import Signin from "./components/signin/Signin"
import Signup from "./components/signup/Signup"
import About from "./components/about/About"
import UserProfile from "./components/userprofile/UserProfile";
import AuthorProfile from "./components/authorprofile/AuthorProfile"; 

function App() {
  const browserRouter=createBrowserRouter([
    //routing configuration
    {
      path:'',
      element:<RootLayout />,
      children:[{ 
        path:"",
        element:<Home />
       },
       { 
        path:"signin",
        element:<Signin />
       },
       { 
        path:"signup",
        element:<Signup />
       },
       { 
        path:"about",
        element:<About />
       },
       {
        path:"user-profile",
        element:<UserProfile />
       },
       {
        path:"author-profile",
        element:<AuthorProfile />
       }
      ],
    },
  ]);
  return (
    <div>
      {/*providing browser router to app*/}
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App;