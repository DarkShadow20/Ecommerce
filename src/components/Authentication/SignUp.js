import "./SignUp.css";
import { useAuth } from "../../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { validateUserInput } from "../utils";
import axios from "axios";


export const SignUp = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUserSignedIn, setSignIn] = useState(false);
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(true);

  const { setLogin, setUserName, setUserData } = useAuth();
  const location = useLocation();
  const signupBtnHandler = () => {
    const validations = validateUserInput({
      name: newName,
      email: newEmail,
      password: newPassword
    });

    if (newPassword !== confirmPassword) {
      setError("Your password didn't match!");
    } else if (
      validations.checkName &&
      validations.checkEmail &&
      validations.checkPassword
    ) {
      setError("");
      axios
        .post("https://Ecom.kunalgupta9.repl.co/users/signup", {
          email: newEmail,
          password: newPassword,
          name: newName
        })
        .then((res) => {
          setSignIn(res.data.success);
          setLogin(true);
          setUserName(newName);
          setUserData(res.data.user)
        });
    } else {
      !validations.checkName && setError("Name must be characters only!");
      !validations.checkEmail && setError("Invalid email!");
      !validations.checkPassword && setError("Enter a strong password!");
    }
  };

  return (
    <>
    <div className="signup-wrapper">
      <h1>Sign up</h1>
      <div className="signup-inputWrapper">
        <label>
          Name
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
      </div>
      <div className="signup-inputWrapper">
        <label>
          Email
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="signup-inputWrapper">
        <label>
          Password
          <div style={{ position: "relative" }}>
            <input
              type={togglePassword ? "password" : "text"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              onClick={() => setTogglePassword((prev) => !prev)}
              className="signup-toggleShowPassword"
            >
              {togglePassword ? "Show" : "Hide"}
            </div>
          </div>
        </label>
      </div>
      <div className="signup-inputWrapper">
        <label>
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={signupBtnHandler}>Sign up</button>
      {error}
      <h4>
        {isUserSignedIn && (
          <Navigate
            state={{
              from: location?.state?.from ? location.state.from : "/"
            }}
            to="/login"
          />
        )}
      </h4>
    </div>
    </>
  );
};