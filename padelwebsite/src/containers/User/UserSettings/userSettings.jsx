import React, { useEffect, useState } from "react";
import { errorCheck } from "../../../services/errorManage";
import { bringUsers, eraseUser, bringUserBooking } from "../../../services/apiCalls"
import EyeIcon from "../../../components/icons/EyeIcon";
import EyeSlashIcon from "../../../components/icons/EyeSlashIcon";
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from "../userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./userSettings.scss";



const UserSettings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataBase = "http://localhost:3001/";

    const userReduxCredentials = useSelector(userData);

    const jwt = userReduxCredentials?.credentials?.jwt;

    //Hooks
    const [user, setUser] = useState({
        name: userReduxCredentials?.credentials?.name,
        email: userReduxCredentials?.credentials?.email,
        phone: userReduxCredentials?.credentials?.phone,
        // dni: userReduxCredentials?.credentials?.dni,
        password: "",
        password2: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        phoneError: "",
        // dniError: "",
        passwordError: "",
        password2Error: "",
    });

    const [notEmail, setNotEmail] = useState("");



    const [disabled, setDisabled] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);



    const [bookingsUsers, setBookingsUsers] = useState([]);
    const [users, setUsers] = useState([]);


    //bringing users from api
    const updateUsers = () => {
        bringUsers(jwt).then((users) => {
            setUsers(users);
        }).catch((error) => console.error(error))
    }

    //bringing bookings from api
    const updateBookingsUsers = () => {
        bringUserBooking(jwt).then((bookingsUsers) => {
            setBookingsUsers(bookingsUsers);

        }).catch((error) => console.error(error))
    }

    useEffect(() => {
        updateUsers()
        updateBookingsUsers()
    }, [])

    const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };
    const inputEraseHandler = (e) => {
        setNotEmail(
            e.target.value
        )

    };

    useEffect(() => {
        setDisabled(!acceptedTerms);
    }, [acceptedTerms]);

    const updateUser = async () => {
        try {

            let resultado = await axios.put(dataBase + "users/updateUser/" + userReduxCredentials?.credentials?.email,
                {
                    name: user.name,
                    password: user.password,
                    phone: user.phone,

                },

                {
                    headers: { Authorization: `Bearer ${jwt}` },
                })

            // setTimeout(() => {

            //     navigate("/");
            // }, 600);

            //ESTO DE AQUI HAY QUE REVISARLO
            let save = resultado.data.config;
            dispatch(login({ ...user, credentials: user }));
            console.log("Actualización de datos realizada con éxito", userReduxCredentials)
            console.log("Esto es el resultat que busco pa actualisar", resultado.config.data)

        } catch (error) {
            console.error(' FALLOOO')
        }

    };


    //bringing users from ap

    const handleEraseSubmit = () => {
        try {

            if (notEmail !== userReduxCredentials?.credentials?.email) {

                eraseUser(notEmail, jwt);
            }

            updateUsers()
            updateBookingsUsers()

        } catch (error) {
            console.error(error)
        };
    }

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

    if (userReduxCredentials?.credentials?.roleRoleId === "admin") {

        return (
            <div className="settingsViewDesign">


                <div className="settingsBoxDesign">


                    <h1 className="updateTittleDesign">Actualice sus credenciales</h1>
                    <div className="formSquare2">
                        <p>NOMBRE</p>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            className="updateInputs"
                            placeholder="Name"
                            onChange={inputHandler}
                            onInput={(e) => errorHandler(e.target.name, e.target.value, "text")}
                        />
                        <p>TELÉFONO:</p>
                        <input
                            type="text"
                            name="phone"
                            className="updateInputs"
                            value={user.phone}
                            placeholder="Phone Number"
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "phone")
                            }
                        />
                        <div className="errorInput">{userError.phoneError}</div>
                        <p>CONTRASEÑA:</p>
                        <div className="updateInputs inputContainer">
                            <input
                                className="inputDesign passwordInput"
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                value={user.password}
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
                        <p>REPITE TU CONTRASEÑA:</p>
                        <input
                            type="password"
                            name="password2"
                            className="updateInputs"
                            value={user.password2}
                            placeholder="Repeat your password"
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "password")
                            }
                        />
                        <div className="errorInput">{userError.password2Error}</div>
                        <div className="adviseDesign">
                            <input
                                type="checkbox"
                                defaultChecked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                            />

                            <p>

                                Por seguridad, se cerrará sesión cuando actualice su usuario. Por favor, revise los datos y acepte.
                            </p>
                        </div>
                        <br></br>
                        <div onClick={() => updateUser()} className="buttonssDesign">
                            Actualizar ahora!
                        </div>


                    </div>
                </div >
                <div className="settingsBoxDesign">


                    <h1 className="updateTittleDesign">Ajustes del Administrador</h1>
                    <div className="formSquare2">
                        <div className="eraseBox">

                            <input type="text" name="notEmail" className="eraseInput" placeholder="user Email" onChange={inputEraseHandler} />
                            <div onClick={handleEraseSubmit}>Borrar usuario</div>
                        </div>
                        <br />
                        Usuarios

                        {users.map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className="usersBoxDesign">
                                    Id: {user.user_id}
                                    <br />
                                    Usuario: {user.name}
                                    <br />
                                    Email: {user.email}
                                    <br />
                                </div>
                            )
                        })}

                        Reservas

                        {bookingsUsers.map((booking, index) => {
                            return (
                                <div
                                    key={index}
                                    className="usersBoxDesign">
                                    Id Reserva: {booking.booking_id}
                                    <br />
                                    Id Reserva - usuario {booking.userUserId}
                                    <br />
                                    Id Reserva - partido: {booking.gameGameId}
                                    <br />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>



        );

    }
    // else if (userReduxCredentials?.credentials?.roleRoleId === "sportscenteradmin") {
    //     return (
    //         <div className="settingsViewDesign">


    //             <div className="settingsBoxDesign">


    //                 <h1 className="updateTittleDesign">Actualice sus credenciales</h1>
    //                 <div className="formSquare2">
    //                     <p>NOMBRE</p>
    //                     <input
    //                         type="text"
    //                         name="name"
    //                         value={user.name}
    //                         className="updateInputs"
    //                         placeholder="Name"
    //                         onChange={inputHandler}
    //                         onInput={(e) => errorHandler(e.target.name, e.target.value, "text")}
    //                     />
    //                     <p>TELÉFONO:</p>
    //                     <input
    //                         type="text"
    //                         name="phone"
    //                         className="updateInputs"
    //                         value={user.phone}
    //                         placeholder="Phone Number"
    //                         onChange={inputHandler}
    //                         onInput={(e) =>
    //                             errorHandler(e.target.name, e.target.value, "phone")
    //                         }
    //                     />
    //                     <div className="errorInput">{userError.phoneError}</div>
    //                     <p>CONTRASEÑA:</p>
    //                     <div className="updateInputs inputContainer">
    //                         <input
    //                             className="inputDesign passwordInput"
    //                             type={passwordShown ? "text" : "password"}
    //                             name="password"
    //                             value={user.password}
    //                             placeholder="Password"
    //                             onChange={inputHandler}
    //                             onInput={(e) =>
    //                                 errorHandler(e.target.name, e.target.value, "password")
    //                             }
    //                         />
    //                         {passwordShown ? (
    //                             <EyeSlashIcon classes="eyeIcon" onClick={togglePassword} />
    //                         ) : (
    //                             <EyeIcon classes="eyeIcon" onClick={togglePassword} />
    //                         )}
    //                     </div>
    //                     <div className="errorInput">{userError.passwordError}</div>
    //                     <p>REPITE TU CONTRASEÑA:</p>
    //                     <input
    //                         type="password"
    //                         name="password2"
    //                         className="updateInputs"
    //                         value={user.password2}
    //                         placeholder="Repeat your password"
    //                         onChange={inputHandler}
    //                         onInput={(e) =>
    //                             errorHandler(e.target.name, e.target.value, "password")
    //                         }
    //                     />
    //                     <div className="errorInput">{userError.password2Error}</div>
    //                     <div className="adviseDesign">
    //                         <input
    //                             type="checkbox"
    //                             defaultChecked={acceptedTerms}
    //                             onChange={() => setAcceptedTerms(!acceptedTerms)}
    //                         />

    //                         <p>

    //                             Estoy seguro de que qiero modificar mis datos
    //                         </p>
    //                     </div>
    //                     <br></br>
    //                     <div onClick={() => updateUser()} className="buttonDesign">
    //                         Actualizar ahora!
    //                     </div>


    //                 </div>
    //             </div >
    //             <div className="settingsBoxDesign">


    //                 <h1 className="updateTittleDesign">PARTIDOS </h1>
    //                 <div className="formSquare2">
    //                     <div className="eraseBox">

    //                         <input type="text" name="games" className="eraseInput" placeholder="user Email" onChange={inputEraseHandler} />
    //                         <div onClick={handleEraseSubmit}>Borrar usuario</div>
    //                     </div>
    //                     <br />
    //                     Usuarios

    //                     {users.map((user, index) => {
    //                         return (
    //                             <div
    //                                 key={index}
    //                                 className="usersBoxDesign">
    //                                 Id: {user.id_user}
    //                                 <br />
    //                                 Usuario: {user.name}{user.surname}
    //                                 <br />
    //                                 Email: {user.email}
    //                                 <br />
    //                             </div>
    //                         )
    //                     })}

    //                     Reservas

    //                     {bookingsUsers.map((booking, index) => {
    //                         return (
    //                             <div
    //                                 key={index}
    //                                 className="usersBoxDesign">
    //                                 Id Reserva: {booking.booking_id}
    //                                 <br />
    //                                 Id Reserva - usuario {booking.userUserId}
    //                                 <br />
    //                                 Id Reserva - partido: {booking.gameGameId}
    //                                 <br />
    //                             </div>
    //                         )
    //                     })}

    //                 </div>
    //             </div>
    //         </div>



    //     );}
    else {
        return (
            <div className="settingsViewDesign">


                <div className="settingsBoxDesign">


                    <h1 className="updateTittleDesign">Actualice sus credenciales</h1>
                    <div className="formSquare2">
                        <p>NOMBRE</p>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            className="updateInputs"
                            placeholder="Name"
                            onChange={inputHandler}
                            onInput={(e) => errorHandler(e.target.name, e.target.value, "text")}
                        />

                        <p>TELÉFONO:</p>
                        <input
                            type="text"
                            name="phone"
                            className="updateInputs"
                            value={user.phone}
                            placeholder="Phone Number"
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "phone")
                            }
                        />
                        <div className="errorInput">{userError.phoneError}</div>
                        <p>CONTRASEÑA:</p>
                        <div className="updateInputs inputContainer">
                            <input
                                className="inputDesign passwordInput"
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                value={user.password}
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
                        <p>REPITA SU CONTRASEÑA:</p>
                        <input
                            type="password"
                            name="password2"
                            className="updateInputs"
                            value={user.password2}
                            placeholder="Repeat your password"
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "password")
                            }
                        />
                        <div className="errorInput">{userError.password2Error}</div>
                        <div className="adviseDesign">
                            <input
                                type="checkbox"
                                defaultChecked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                            />

                            <p>

                                Estoy seguro de que qiero modificar mis datos
                            </p>
                        </div>
                        <br></br>
                        <div onClick={() => updateUser()} className="buttonssDesign">
                            Actualizar ahora!
                        </div>
                    </div>
                </div >
            </div>
        )
    }
};

export default UserSettings;