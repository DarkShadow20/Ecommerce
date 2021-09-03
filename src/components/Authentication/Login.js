import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { validateUserInput } from "../utils";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const { isUserLoggedIn, setLogin, setUserName,setUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(true);

  const guestUserHandler=(e)=>{
    setEmail("ram@gmail.com")
    setPassword("Lolo@123")
  }
  const loginBtnHandler = async (e) => {
    e.preventDefault();
    try{
      if (validateUserInput({ email }).checkEmail) {
        setError("");
        axios
          .post("https://Ecom.kunalgupta9.repl.co/users/login", {
            email,
            password
          })
          .then((res) => {
            if (!res.data.success) {
              setError("Email or password didn't match!");
            }
            setLogin(res.data.success);
            if (res.data.success) {
              setUserData(res.data.user)
              navigate(location?.state?.from ? location.state.from : "/");
            }
            setUserName(res.data.name);
          });
      }
    }
     catch(err) {
      setError("Enter valid email!");
    }
  };

  return (
    <>
    <form onSubmit={loginBtnHandler}>
    <div className="login-wrapper">
      {isUserLoggedIn && (
        <Navigate to={location?.state?.from ? location.state.from : "/"} />
      )}
      <h1>Login</h1>

      <div className="login-inputWrapper">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="login-inputWrapper">
        <label>
          Password
          <div style={{ position: "relative" }}>
            <input
              type={togglePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setTogglePassword((prev) => !prev)}
              className="login-toggleShowPassword"
            >
              {togglePassword ? "Show" : "Hide"}
            </div>
          </div>
        </label>
        <span className="login-errorPrompt">{error}</span>
      </div>

      <button>
        <Link
          state={{
            from: location?.state?.from ? location.state.from : "/"
          }}
          replace
          to="/signup"
          style={{ "color": "#fff" , "textDecoration": "none" }}
        >
          Sign up
        </Link>
      </button>
      <button onClick={loginBtnHandler} style={{cursor:"pointer"}}>Login</button>
      <br/>
      <button style={{marginLeft:"1rem",width:"10rem", cursor:"pointer"}} onClick={guestUserHandler}>Login as GuestUser</button>
    </div>
    </form>
    </>
  );
};