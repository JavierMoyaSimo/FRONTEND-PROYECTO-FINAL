import React, { useEffect, useState } from "react";
import { errorCheck } from "../../../services/errorManage";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import EyeIcon from "../../../components/icons/EyeIcon";
import EyeSlashIcon from "../../../components/icons/EyeSlashIcon";
import axios from "axios";

const Register = () => {

    const dataBase = "http://localhost:3001/";

    //Hooks
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        phone: "",
        dni: "",

    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        password2Error: "",
        phoneError: "",
        dniError: "",
        registerError: "",

    });

    const [disabled, setDisabled] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();

    const SignIn = async () => {
        try {

            let resultado = await axios.post(dataBase + "auth/register", {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                dni: user.dni,
                roleRoleId: "user"
            });
            if (resultado) {
                console.log("Registro completado con exito")
            } else

                setTimeout(() => {

                    navigate("/login");
                }, 300);



        } catch (error) {
            console.error('Registro fallido')
            userError.registerError = "Registro fallido, revise todos los campos"
            setUserError(userError)
        }




    };

    const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const userIsNotFilled = Object.values(user).some((property) => {
            return property === "";
        });
        setDisabled(userIsNotFilled || !acceptedTerms);
    }, [user, acceptedTerms]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    const errorHandler = (field, value, type) => {
        let error = "";
        error = errorCheck(value, type);
        setUserError((prevState) => ({
            ...prevState,
            [field + "Error"]: error,
        }));
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="registerDesign">
            <div className="formRegisterSquare">
                <h1 className="registerTittleDesign">WELCOME</h1>
                <div >
                    <input
                        type="text"
                        name="name"
                        className="registerInputs"
                        placeholder="Name"
                        required
                        onChange={inputHandler}
                        onInput={(e) => errorHandler(e.target.name, e.target.value, "text")}
                    />
                    <div className="errorInput">{userError.nameError}</div>
                    <input
                        type="text"
                        name="email"
                        className="registerInputs"
                        placeholder="Email"
                        onChange={inputHandler}
                        onInput={(e) =>
                            errorHandler(e.target.name, e.target.value, "email")
                        }
                    />
                    <div className="errorInput">{userError.emailError}</div>
                    <input
                        type="text"
                        name="phone"
                        className="registerInputs"
                        placeholder="Phone Number"
                        onChange={inputHandler}
                        onInput={(e) =>
                            errorHandler(e.target.name, e.target.value, "phone")
                        }
                    />
                    <div className="errorInput">{userError.phoneError}</div>
                    <input
                        type="text"
                        name="dni"
                        className="registerInputs"
                        placeholder="DNI"
                        required
                        onChange={inputHandler}
                        onInput={(e) => errorHandler(e.target.name, e.target.value, "dni")}
                    />
                    <div className="errorInput">{userError.dniError}</div>
                    <div className="registerInputs inputContainer">
                        <input
                            className="inputDesign passwordInput"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "password")
                            }
                        />
                        {passwordShown ? (
                            <EyeSlashIcon classes="eyeIcon" onClick={togglePassword} />
                        ) : (
                            <EyeIcon classes="eyeIcon" onClick={togglePassword} />
                        )}
                    </div>
                    <div className="errorInput">{userError.passwordError}</div>
                    <input
                        type="password"
                        name="password2"
                        className="registerInputs"
                        placeholder="Repeat your password"
                        onChange={inputHandler}
                        onInput={(e) =>
                            errorHandler(e.target.name, e.target.value, "password")
                        }
                    />
                    <div className="errorInput">{userError.password2Error}</div>
                    <div className="registerAdviseDesign">

                        <input
                            type="checkbox"
                            defaultChecked={acceptedTerms}
                            onChange={() => setAcceptedTerms(!acceptedTerms)}
                        />
                        <p>

                            He leido la <i>politica</i> de <i>privacidad</i> de la empresa{" "}
                        </p>
                    </div>
                    <br></br>
                    <div>
                        <div onClick={() => SignIn()} className="buttonDesign">
                            Registrarme!
                        </div>
                        <div className="errorInput">{userError.registerError}</div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Register;