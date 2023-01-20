import React, { useState, useEffect } from "react";
import "./Game.scss";
import { useSelector, useDispatch } from "react-redux";
import { gameData } from "./gamesSlice";
import { addBooking, bookingData } from "../User/UserBooking/bookingSlice";
import { userData } from "../User/userSlice";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { bringGamesbySportsCenter } from "../../services/apiCalls";

const Game = () => {

    const dispatch = useDispatch();
    const selectedGame = useSelector(gameData);
    const title = selectedGame?.details;
    const credentials = useSelector(userData);
    const navigate = useNavigate();


    //Hooks
    const [games, setGames] = useState([]);

    useEffect(() => {


        if (games.length === 0) {
            bringGamesbySportsCenter(selectedGame.details, jwt)
                .then((games) => {
                    setGames(games);
                })
                .catch((error) => console.error(error));
        }
    }, []);




    const email = credentials?.credentials?.email;
    const jwt = credentials?.credentials?.jwt;
    const idgameid = games.game_id
    const body = { email, title };
    const body2 = { email, idgameid }
    const dataBase = "https://proyecto-final-production-3793.up.railway.app";

    const rentGame = async (body2, jwt) => {


        let game_id = body2.game.game_id;
        console.log(jwt, "tokentoken")

        try {
            console.log(jwt, "ESTE ES EL TOKEN");
            let res = await axios.post(dataBase + "/bookings/newBooking", { email, game_id }, {
                headers: { Authorization: `Bearer ${jwt}` },
            });



            if (res.data.message === "No se ha realizado la reserva,  este partido ya ha sido reservado") {
                document.getElementById("reserror").innerHTML = "";
                setTimeout(() => {
                    document.getElementById("reserror").innerHTML = `No se ha realizado la reserva, el partido con identificador número ${game_id} ya ha sido reservado`;
                    // window.location.href = "https://proyecto-final-production-3793.up.railway.app/game/#reserror";
                }, 500);


            }

            else {
                document.getElementById("reserror").innerHTML = "";
                dispatch(addBooking({ bookings: res.data.resp }));
                navigate("/userBooking")
                return res;
            }


        }

        catch (err) {
            console.error(err);

        }





    }




    const returnHome = () => {
        navigate("/");
    }

    if (games.length === 0) { return <div className="gamewithOutGames"></div>; }
    else if (games.length > 0) {

        return (
            <div className="containerDesign paddingGame">

                <div className="gameDesign row mt-4 mb-4">

                    {games.map((game, index) => {
                        return (
                            <div
                                key={index}
                                className="gameShow mb-3 col-lg-6 col-md-6 col-sm-12 ">
                                <div className='gamesNumber gameNumberId'>
                                    <p className='pGames'>Partido numero:</p>
                                    {game.game_id}

                                </div>
                                <div className='gamesNumber'>
                                    <p className='pGames'>Fecha:</p>
                                    {game.date}
                                </div>
                                <div className='gamesNumber'>
                                    <p className='pGames'>Tipo:</p>
                                    {game.type}
                                </div>
                                <div className='gamesNumber'>
                                    <p className='pGames'>Jugadores:</p>
                                    {game.players}
                                </div>

                                {credentials?.credentials?.jwt !== undefined &&
                                    <div className="gamesNumber">
                                        <div onClick={() => rentGame({ game, email }, jwt)} className='gameButton  mb-2'>
                                            Reservar partido
                                        </div>


                                    </div>

                                }



                            </div>
                        );
                    })}

                    <div onClick={() => returnHome()} className='gameButton'>
                        Volver a Home
                    </div>
                    <div id="reserror"></div>



                </div>


            </div>

        )

    } else {
        return (
            <div className="gameDesign">
                <div>Ha Habido un error</div>
                <div onClick={() => returnHome()} className='gameButton'>
                    Volver a Home
                </div>

            </div>


        )
    }


}
export default Game;