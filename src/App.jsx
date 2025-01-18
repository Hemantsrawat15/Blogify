import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [loading, setLoading]);
  
  if(!loading){
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header/>
          <main>
            {/* <Outlet/> */}
          </main>
          <Footer/>
        </div>
      </div>
    )
  }
  else{
    return <div>Loading</div>
  }
}

export default App;
