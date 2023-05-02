import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import * as jose from "jose";
import { useNavigate } from "react-router-dom";
import { URL } from "../config";
import { GridLoader } from "react-spinners";

const LoginModal = ({ modal, setModal, login, setUser }) => {
  const [isInside, setIsInside] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    email: "",
    password: "",
    password2: "",
  });
  const resetMessage = () => {
    setMessage({ message: "", color: "" });
  };
  // LOGIN
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: registerForm.email.toLowerCase(),
        password: registerForm.password,
      });
      // setMessage({message: response.data.message});
      if (response.data.message !== "Welcome back") {
        setMessage({ message: response.data.message, color: "red" });
      } else {
        setMessage({ message: response.data.message, color: "green" });
      }
      if (response.data.ok) {
        let decodedToken = jose.decodeJwt(response.data.token);
        try {
          const res = await axios.get(`${URL}/users/${decodedToken.userEmail}`);
          setUser({
            firstname: res.data.data.firstname,
            email: res.data.data.email,
          });
          setLoading(true);
        } catch (err) {
          console.log(err);
        }
        setTimeout(() => {
          setModal({ modal: "login", display: false });
          login(response.data.token);
          setLoading(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // REGISTER
  const handleChangeRegister = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/users/register`, {
        firstname: registerForm.firstname,
        email: registerForm.email,
        password: registerForm.password,
        password2: registerForm.password2,
      });
      if (response.data.message === "Successfully registered") {
        setMessage({ message: response.data.message, color: "green" });
      } else {
        setMessage({ message: response.data.message, color: "red" });
      }
      if (response.data.ok) {
        setLoading(true);
        setTimeout(() => {
          setModal({ display: true, content: "login" });
          setMessage("");
          setLoading(false);
          setRegisterForm({
            firstname: "",
            email: "",
            password: "",
            password2: "",
          });
          if (response.data.message === "Successfully registered") {
            setModal({ ...modal, tab: "login" });
          }
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const insideHandler = () => {
    return !isInside && setModal({ display: false, tab: "login" });
  };
  return (
    <div
      className={modal.display ? "modal-overlay fadeIn" : ""}
      onClick={insideHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LOGIN MESSAGE  */}
      {modal.tab === "login" && (
        <div
          className={
            message.message
              ? "modal-message-login active"
              : "modal-message-login"
          }
        >
          <p style={{ color: `${message.color}` }}>{message.message}</p>
        </div>
      )}
      {/* REGISTER MESSAGE  */}
      {modal.tab === "register" && (
        <div
          className={
            message.message
              ? "modal-message-register active"
              : "modal-message-register"
          }
        >
          <p style={{ color: `${message.color}` }}>{message.message}</p>
        </div>
      )}
      {/* modal container  */}
      <div
        className={
          modal.tab === "login" ? "modal-container" : "modal-container-register"
        }
        onMouseEnter={() => setIsInside(true)}
        onTouchStart={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
      >
        <div className="modal-container-inner">
          {/* modal header  */}
          <div className="modal-header">
            {loading && (
              <GridLoader
                size={3}
                color="#696660"
                cssOverride={{
                  position: "absolute",
                  right: "50%",
                  top: "0%",
                }}
              />
            )}
            <VscClose
              className="modal-close"
              onClick={() => setModal({ display: false, tab: "login" })}
            />
            <h1>Come on in !</h1>
            <div className="modal-switch">
              <p
                onClick={() => {
                  setModal({ ...modal, tab: "login" });
                  resetMessage();
                }}
              >
                <span
                  className={
                    modal.tab === "login" ? "modal-active-underline" : ""
                  }
                >
                  Sign In
                </span>
              </p>
              <p
                onClick={() => {
                  setModal({ ...modal, tab: "register" });
                  resetMessage();
                }}
              >
                <span
                  className={
                    modal.tab === "register" ? "modal-active-underline" : ""
                  }
                >
                  I'm new here
                </span>
              </p>
            </div>
          </div>
          {/* end of header  */}
          {/* modal body  */}
          {modal.tab === "login" && (
            <form
              className="modal-body fadeIn"
              onSubmit={handleSubmitLogin}
              onChange={(e) => handleChangeRegister(e)}
            >
              <div className="input-container">
                <p>E-mail address</p>
                <input name="email" type="email" autoComplete="email" />
              </div>
              <div className="input-container">
                <p>Password</p>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <button>Sign in</button>
            </form>
          )}
          {modal.tab === "register" && (
            <form
              className="modal-body fadeIn"
              onSubmit={handleSubmitRegister}
              onChange={(e) => handleChangeRegister(e)}
            >
              <div className="input-container">
                <p>E-mail address</p>
                <input name="email" type="email" autoComplete="email" />
              </div>
              <div className="input-container">
                <p>First name</p>
                <input name="firstname" autoComplete="firstName" />
              </div>
              <div className="input-container">
                <p>Password</p>
                <input
                  name="password"
                  type="password"
                  autoComplete="password"
                />
              </div>
              <div className="input-container">
                <p>Confirm password</p>
                <input
                  name="password2"
                  type="password"
                  autoComplete="confirmPassword"
                />
              </div>
              <button>Register</button>
            </form>
          )}
          {/* end of body  */}
          {modal.tab === "login" && (
            <div className="modal-footer">
              <p onClick={() => setModal({ ...modal, tab: "register" })}>
                New to treviso? Register.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
