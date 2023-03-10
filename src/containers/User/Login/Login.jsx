import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from "../userSlice";
import { errorCheck } from "../../../services/errorManage";
import "./Login.scss";
import EyeIcon from "../../../components/icons/EyeIcon";
import EyeSlashIcon from "../../../components/icons/EyeSlashIcon";


const Login = () => {


  const dataBase = "https://proyecto-final-production-3793.up.railway.app/";


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userReduxCredentials = useSelector(userData);

  //HOOKS
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    loginError: "",
  });


  const [passwordShown, setPasswordShown] = useState(false);

  // HANDLERS
  const inputHandler = (e) => {

    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorHandler = (field, value, type) => {
    let error = "";
    error = errorCheck(value, type);
    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error,
    }));
  };

  //Life cycle-methods:
  useEffect(() => {


    if (userReduxCredentials?.credentials?.jwt !== undefined) {

      navigate("/");
    }
  }, []);

  const logMe = async (user) => {
    try {

      let resultado = await axios.post(dataBase + "auth/login", {
        email: user.email,
        password: user.password
      });

      if (resultado.data == "Password or email is incorrect") {
        userError.loginError = "Email o contraseña no coinciden"
        setUserError(userError)
        document.getElementById("logerror").innerHTML = `${userError.loginError}`;
      }


      dispatch(login({ credentials: resultado.data }));

      setTimeout(() => {

        navigate("/profile");
      }, 300);



    } catch (error) {

      console.error(error)
      userError.loginError = "Email o contraseña no coinciden"
      setUserError(userError)
      document.getElementById("logerror").innerHTML = `${userError.loginError}`;

    }

  };


  //PASSWORD-EYE
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="loginDesign">
      <div className="inputsContainer">
        <h1 className="loginTittleDesign">POR FAVOR, RELLENE LOS CAMPOS PARA INICIAR SESIÓN</h1>
        <div>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={(e) => inputHandler(e)}
            onInput={(e) => errorHandler(e.target.name, e.target.value, "email")}
            className={
              userError.emailError === ""
                ? "inputLogin"
                : "inputLogin inputLoginError"
            }
          />
          <div className="errorMessage">{userError.emailError}</div>
        </div>
        <div className="inputLogin">
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="password"
            onChange={(e) => inputHandler(e)}
            onInput={(e) =>
              errorHandler(e.target.name, e.target.value, "password")
            }
            className={
              userError.passwordError === ""
                ? "inputDesign"
                : "inputDesign inputLoginError"
            }
          />
          {passwordShown ? (
            <EyeSlashIcon classes="eyeIcon" onClick={togglePassword} />
          ) : (
            <EyeIcon classes="eyeIcon" onClick={togglePassword} />
          )}
        </div>
        <div className="errorMessage">{userError.passwordError}</div>
      </div>
      <div>
        <div onClick={() => logMe(user)} className="loginButton">
          Login me!
        </div>
        <div id="logerror" className="errorMessage"></div>
      </div>


    </div>
  );
};

export default Login;
