import { useEffect } from "react";
import "./App.css";
import Login from "./login";
import Signup from "./signup";
import TodoList from "./todoList";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const getLoginUsers = JSON.parse(localStorage.getItem("loginData"));
  
  useEffect(() => {
    // console.log("window", window.location.pathname);
    // console.log("getLoginUsers", getLoginUsers);
    // console.log(
    //   "check",
    //   getLoginUsers && window.location.pathname === "/signup"
    // );
    if (getLoginUsers && window.location.pathname === "/login") {
      navigate("/");
      console.log(
        "check login",
        getLoginUsers && window.location.pathname === "/login"
      );
    } else if (getLoginUsers && window.location.pathname === "/Signup") {
      navigate("/");
      console.log(
        "check signup",
        getLoginUsers && window.location.pathname === "/signup"
      );
    } else if (!getLoginUsers && window.location.pathname === "/") {
      navigate("/login");
    }
    
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
