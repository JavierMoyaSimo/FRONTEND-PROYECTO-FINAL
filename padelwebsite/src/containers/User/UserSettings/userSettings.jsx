import React, { useEffect, useState } from "react";
import { errorCheck } from "../../../services/errorManage";
import { bringUsers, eraseUser, bringUserBooking, bringGames, eraseGame, createGame } from "../../../services/apiCalls"
import EyeIcon from "../../../components/icons/EyeIcon";
import EyeSlashIcon from "../../../components/icons/EyeSlashIcon";
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from "../userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./userSettings.scss";

import { gameData, addGame } from "../../Game/gamesSlice";



const UserSettings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataBase = "http://localhost:3001/";

    const userReduxCredentials = useSelector(userData);
    const gamesFromRedux = useSelector(gameData);

    const jwt = userReduxCredentials?.credentials?.jwt;

    //Hooks
    const [user, setUser] = useState({
        name: userReduxCredentials?.credentials?.name,
        email: userReduxCredentials?.credentials?.email,
        phone: userReduxCredentials?.credentials?.phone,
        password: "",
        password2: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        phoneError: "",
        passwordError: "",
        password2Error: "",
    });

    const [games, setGames] = useState([]);
    const [notGame, setNotGame] = useState("");

    const [notEmail, setNotEmail] = useState("");



    const [disabled, setDisabled] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);



    const [bookingsUsers, setBookingsUsers] = useState([]);
    const [users, setUsers] = useState([]);


    //bringing games from api
    const updateGames = () => {
        bringGames(jwt).then((games) => {
            setGames(games);
        }).catch((error) => console.error(error))
    }

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
        updateGames();
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

    const gameEraseHandler = (e) => {
        setNotGame(
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

            dispatch(login({ ...user, credentials: user }));

            navigate("/");

        } catch (error) {
            console.error(' FALLOOO')
        }

    };

    // let bodygame = {
    //     type: games.type,
    //     players: games.players,
    //     date: games.date,
    //     sportscenterSportscenterId: games.sportscenterSportscenterId,
    // }

    // --------------------------------------------------------------------------------------------------------
    // const NewGame = async (bodygame, jwt) => {

    //     createGame(bodygame, jwt)
        // try {

        //     console.log(games, "ESTOSSONGAMESENNEWGAME");

        //     let resultado = await axios.post(dataBase + "games/newGame", {
        //         type: games.type,
        //         players: games.players,
        //         date: games.date,
        //         sportscenterSportscenterId: games.sportscenterSportscenterId,

        //     }, );
        //     if (resultado) {
        //         console.log("PARTIDO CREADO CON EXITO")

        //         updateGames();
        //     } else {
        //         console.log("ESTE ES EL ELSE")

        //         userError.registerError = "No se ha creado el partido"

        //     }




        // } catch (error) {
        //     console.error('Creacion fallida')


        // }




    // };
    // --------------------------------------------------------------------------------------------------------

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

    //-----------------------------------------------------------------------------------------------------
    // bringing games from ap

    const handleEraseGame = () => {
        try {

            if (notGame !== gamesFromRedux?.details?.game_id) {

                eraseGame(notGame, jwt);
            }


            updateGames();

        } catch (error) {
            console.error(error)
        };
    }
    //-----------------------------------------------------------------------------------------------------

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

                                Por seguridad, se cerrará sesión cuando actualice su usuario y se redirigirá a Home.
                                Por favor, revise los datos y acepte.
                            </p>
                        </div>
                        <br></br>

                        {acceptedTerms === true &&

                            <div onClick={() => updateUser()} className="buttonssDesign">
                                Actualizar ahora!
                            </div>

                        }




                    </div>
                </div >
                <div className="settingsBoxDesign">


                    <h1 className="updateTittleDesign">Ajustes del Administrador</h1>
                    <div className="formSquare2">
                        <div className="eraseBox">

                            <input type="text" name="notEmail" className="eraseInput" placeholder="user Email" onChange={inputEraseHandler} />
                            <div onClick={handleEraseSubmit} className="cursorok">Borrar usuario</div>
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
    else if (userReduxCredentials?.credentials?.roleRoleId === "sportscenteradmin") {
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

                                Estoy seguro de que qiero modificar mis datos
                            </p>
                        </div>
                        <br></br>

                        {acceptedTerms === true &&

                            <div onClick={() => updateUser()} className="buttonssDesign">
                                Actualizar ahora!
                            </div>

                        }

                    </div>
                </div >
                <div className="settingsBoxDesign">


                    <h1 className="updateTittleDesign">PARTIDOS </h1>
                    <div className="formSquare2">
                        <div className="eraseBox">

                            <input type="text" name="games" className="eraseInput" placeholder="Id del partido" onChange={gameEraseHandler} />
                            <div onClick={handleEraseGame} className="cursorok">Borrar partido</div>
                        </div>
                        <br />
                        Partidos

                        {games.map((game, index) => {
                            return (
                                <div
                                    key={index}
                                    className="usersBoxDesign">
                                    Id: {game.game_id}
                                    <br />
                                    Tipo: {game.type}
                                    <br />
                                    Fecha: {game.date}
                                    <br />
                                    Polideportivo: {game.sportscenterSportscenterId}
                                </div>
                            )
                        })}

                        Crear Nuevo partido
                        {/* -------------------------------------------------------------------------- */}
                        <div >

                            <div >
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="Tipo"
                                    required
                                    onChange={inputHandler}

                                />

                                <input
                                    type="text"
                                    name="players"
                                    placeholder="Nº jugadores"
                                    onChange={inputHandler}

                                />

                                <input
                                    type="text"
                                    name="date"
                                    placeholder="Fecha formato: AAAA-MM-DD hh:mm:ss"
                                    onChange={inputHandler}

                                />

                                <input
                                    type="text"
                                    name="sportscenterId"
                                    placeholder="Polideportivo ID"
                                    required
                                    onChange={inputHandler}

                                />


                                <br></br>
                                <div className="buttoncenter">
                                    {/* <div onClick={() => NewGame()} className="buttonssDesign">
                                        Crear partido!
                                    </div> */}

                                </div>



                            </div>
                        </div>
                        {/* -------------------------------------------------------------------------- */}


                    </div>
                </div>
            </div>



        );
    }
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


                        {acceptedTerms === true &&

                            <div onClick={() => updateUser()} className="buttonssDesign">
                                Actualizar ahora!
                            </div>

                        }
                    </div>
                </div >
            </div>
        )
    }
};

export default UserSettings;