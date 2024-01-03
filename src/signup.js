// import facebook from "./assets/facebook.webp"
// import google from "./assets/Google.webp"
// import instagram from "./assets/Instagram.webp"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';

function Signup() {
  const userId = uuidv4();  
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userId: userId
  });
  // useEffect(()=>{
  //   localStorage.setItem("users", JSON.stringify([]));
  //   const getUsers = JSON.parse(localStorage.getItem("users"));
  //   if (getUsers === " "){
  //     getUsers.push(user)
  //   }
  // },[])

  return (
    <div className="h-[100%] w-[100%] bg-cover   bg-login-background flex justify-center items-center">
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
              Create Your New Account
            </h1>
          </div>
          {/* <div className=" px-[10px] flex justify-center  ">
        <img className="h-[50px] m-[10px]" src={facebook} alt="" />
        <img className="h-[50px] m-[10px] " src={google} alt="" />
        <img className="h-[50px] m-[10px]" src={instagram} alt="" />
        </div> 
        <div className="text-center px-[10px] text-[gray]">
          or use your email for registration:
        </div>*/}
          <div className=" h-[calc(100%-190px)] px-[10px] w-[100%] flex justify-center items-center ">
            <form
              onChange={(event) => {
                setUser({ ...user, [event.target.name]: event.target.value });
                console.log("user", event.target.value);
              }}
              onSubmit={(event) => {
                event.preventDefault();

                let getUsers = JSON.parse(localStorage.getItem("users")) || [];

                // let getUsers = JSON.parse(localStorage.getItem("users")) ;
                console.log("getUsers", getUsers);
                // console.table("before getValue", getValue, getValue.length);

                const userAlreadyExist = getUsers?.some(
                  (userData) => userData.email === user.email
                );
                
                if (userAlreadyExist === true) {
                  alert("user Already Exist");
                } else {
                  getUsers.push(user);
                  localStorage.setItem("users", JSON.stringify(getUsers));
                  localStorage.setItem("loginData", JSON.stringify(user));
                  navigate("/");
                }

                console.log("userAlreadyExist", userAlreadyExist);

                // navigate("/todoList");
              }}
              className=" mt-[-30px]  flex flex-col justify-between items-center"
            >
              <div>
                {/* <label>E.Mail : </label> */}
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px] mb-[20px] p-[10px]"
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  name="name"
                  required
                />
              </div>
              <div>
                {/* <label>E.Mail : </label> */}
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px] mb-[20px] p-[10px]"
                  type="email"
                  placeholder="E.mail"
                  value={user.email}
                  name="email"
                  required
                />
              </div>
              <div>
                {/* <label>Password : </label> */}
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px] mb-[20px] p-[10px]"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={user.password}
                  name="password"
                  required
                />
              </div>
              <div className=" text-center text-[white] font-bold p-[10px] text-[20px] rounded-[20px] w-[100px] bg-[#09b892] ">
                <button type="submit">signup</button>
              </div>
              <div className="text-center p-[10px] ">
                Already you have Account?{" "}
                <span
                  className=" cursor-pointer text-[blue]"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  login
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
