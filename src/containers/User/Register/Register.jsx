import React, { useEffect, useState } from "react";
import { errorCheck } from "../../../services/errorManage";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import EyeIcon from "../../../components/icons/EyeIcon";
import EyeSlashIcon from "../../../components/icons/EyeSlashIcon";
import axios from "axios";

const Register = () => {

    const dataBase = "https://proyecto-final-production-3793.up.railway.app/";

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

                setTimeout(() => {

                    navigate("/login");
                }, 300);

            } else {


                userError.registerError = "Registro fallido, revise todos los campos"
                setUserError(userError)

                document.getElementById("regerror").innerHTML = `${userError.registerError}`;
            }




        } catch (error) {
            console.error('Registro fallido')

            userError.registerError = "Registro fallido, revise todos los campos"
            setUserError(userError)
            document.getElementById("regerror").innerHTML = `${userError.registerError}`;
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
                <h1 className="registerTittleDesign">BIENVENID@!</h1>
                <div >
                    <input
                        type="text"
                        name="name"
                        className="registerInputs"
                        placeholder="Nombre"
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
                        placeholder="Teléfono"
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
                            placeholder="Contraseña"
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
                        placeholder="Repita su contraseña"
                        onChange={inputHandler}
                        onInput={(e) =>
                            errorHandler(e.target.name, e.target.value, "password")
                        }
                    />
                    <div className="errorInput">{userError.password2Error}</div>
                    <div className="registerAdviseDesign">



                    </div>
                    <br></br>
                    <div className="buttoncenter">
                        <div onClick={() => SignIn()} className="registerButton">
                            Registrarme!
                        </div>
                        <div id="regerror" className="errorInput"></div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Register;