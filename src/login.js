import facebook from "./assets/facebook.webp";
import google from "./assets/Google.webp";
import instagram from "./assets/Instagram.webp";
import eye from "./assets/eye.png";
import eyeOff from "./assets/eyeOff.png";
import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState({eyeOff});
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const passwordType = () => {
    if (type === "password") {
      setIcon({eye});
      setType("text");
    } else {
      setIcon({eyeOff});
      setType("password");
    }
  };
  return (
    <div className="h-[100%] w-[100%] bg-cover bg-login-background flex justify-center items-center">
      <div className="h-[600px] w-[75%] rounded-[30px] bg-white flex ">
        <div className=" h-[100%] w-[35%] rounded-l-[30px] bg-[#09b892] text-center flex  items-center">
          <div>
            <h1 className="font-bold px-[10px] text-[white] text-[36px] mt-[-30px] ">
              {" "}
              Welcome Back!
            </h1>
            <p className=" text-[22px] px-[10px] font-normal text-[white] ">
              {" "}
              To Keep Connected with us please login with your personal info{" "}
            </p>
          </div>
        </div>
        <div className=" h-[100%] w-[65%] bg-[white] rounded-r-[30px] flex flex-col justify-between">
          <div className=" h-[100px] flex justify-center items-center">
            <h1 className=" font-bold px-[10px] text-[#09b892] text-[30px] flex items-start ">
              {" "}
              Login to Your Account
            </h1>
          </div>
          <div className=" px-[10px] flex justify-center  ">
            <img className="h-[50px] m-[10px]" src={facebook} alt="" />
            <img className="h-[50px] m-[10px] " src={google} alt="" />
            <img className="h-[50px] m-[10px]" src={instagram} alt="" />
          </div>
          <div className="text-center px-[10px] text-[gray]">
            or use your email for registration:
          </div>
          <div className=" h-[calc(100%-190px)] px-[10px] w-[100%] flex justify-center items-center ">
            <form
              onChange={(event) =>
                setLoginUser({
                  ...loginUser,
                  [event.target.name]: event.target.value,
                })
              }
              onSubmit={(event) => {
                event.preventDefault();
                const getUsers =
                  JSON.parse(localStorage.getItem("users")) || [];

                const checkUser = getUsers.find(
                  (userData) =>
                    userData.email === loginUser.email &&
                    userData.password === loginUser.password
                );

                // console.log("checkData", checkUser, loginUser.password);
                if (checkUser) {
                  localStorage.setItem("loginData", JSON.stringify(checkUser));
                  navigate("/");
                } else {
                  alert("user not exist");
                }
              }}
              className=" mt-[-30px]  flex flex-col justify-between items-center"
            >
              <div>
                {/* <label>E.Mail : </label> */}
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px]   p-[10px]"
                  type="email"
                  placeholder="E.mail"
                  value={loginUser.email}
                  name="email"
                  required
                />
              </div>
              <div>
                {/* <label>Password : </label> */}
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px] mt-[20px] p-[10px]"
                  type={type}
                  placeholder="Password"
                  value={loginUser.password}
                  name="password"
                  required
                />
                <div className="p-[10px] text-[12px]  cursor-pointer " onClick={passwordType}>
                {/* <img src={icon} /> */}
               <input className="h-[10px]" type="checkBox"/>show password
              {/* <icon className="absolute mr-10 bg-[blue}" icon={icon} size={25}/> */}
               </div>
              </div>
              
              <div className=" text-center text-[white] font-bold p-[10px] text-[20px] rounded-[20px] w-[100px] bg-[#09b892] ">
                <button type="submit">log in</button>
              </div>
              <div className="text-center p-[10px] ">
                Create a New Account?{" "}
                <span
                  className=" cursor-pointer text-[blue]"
                  onClick={() => {
                    navigate("/Signup");
                  }}
                >
                  signup
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
