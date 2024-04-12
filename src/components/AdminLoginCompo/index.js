import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { IoEyeOff, IoEye } from "react-icons/io5";

const AdminLoginCompo = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState({
    email: "",
    emailRequiredText: "",
  });

  const [loginPassword, setPassword] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [loginServerMessage, setLoginServerMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changeTheLoginEmail = (event) => {
    const emailInput = event.target.value;

    setLoginServerMessage("");

    if (emailInput === "") {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: emailInput,
        emailRequiredText: "",
      }));
    }
  };

  const changeTheLoginPassword = (event) => {
    const passwordInput = event.target.value;

    setLoginServerMessage("");

    if (passwordInput === "") {
      setPassword((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      setPassword((prevState) => ({
        ...prevState,
        password: passwordInput,
        passwordRequiredText: "",
      }));
    }
  };

  const saveTokenAndNavigate = (jwtToken) => {
    Cookies.set("fdb_admin_jwt_token", jwtToken, { expires: 1 });
    navigate("/admin-dashboard");
  };

  const loginTheUser = async () => {
    try {
      const url = "http://localhost:5030/auth/login-admin";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail.email,
          password: loginPassword.password,
        }),
      };
      const loginRes = await fetch(url, options);
      const loginJsonData = await loginRes.json();

      if (loginRes.ok === true) {
        saveTokenAndNavigate(loginJsonData.token);
      } else {
        setLoginServerMessage(loginJsonData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateLoginForm = () => {
    if (loginEmail.email === "") {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else if (loginPassword.password === "") {
      setPassword((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      loginTheUser();
    }
  };

  const submitLoginForm = (event) => {
    event.preventDefault();

    validateLoginForm();
  };

  return (
    <div className="login-form-card">
      <div className="login-logo-image-container">
        <p className="login-logo-name">Login</p>
      </div>
      <form className="login-form-element" onSubmit={submitLoginForm}>
        <div className="d-flex flex-column justify-content-center mt-2 mb-1">
          <label className="login-label" htmlFor="loginEmail">
            Email
          </label>
          <input
            className="login-input-ele"
            id="loginEmail"
            placeholder="Enter Your Email"
            type="text"
            value={loginEmail.email}
            onChange={changeTheLoginEmail}
          />
          <p className="login-required-text">{loginEmail.emailRequiredText}</p>
        </div>
        <div className="d-flex flex-column justify-content-center mt-1 mb-1">
          <label className="login-label" htmlFor="loginPassword">
            Password
          </label>
          <div className="login-input-password-container">
            <input
              className="login-input-password-ele"
              id="loginPassword"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              value={loginPassword.password}
              onChange={changeTheLoginPassword}
            />
            <button
              className="login-password-eye-icon-button"
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          <p className="login-required-text">
            {loginPassword.passwordRequiredText}
          </p>
        </div>
        <div className="login-submit-button-container">
          <button className="login-submit-button" type="submit">
            Login
          </button>
        </div>
        <p className="login-required-text">{loginServerMessage}</p>
      </form>
      <div className="login-forgot-password-container">
        <Link className="login-forgot-password-link">Forgot Password?</Link>
      </div>
      <div className="login-dont-have-account-container">
        <p className="login-dont-have-account-text">
          Don't have an Account?{" "}
          <Link className="login-dont-have-account-link" to={"/admin-signup"}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginCompo;
