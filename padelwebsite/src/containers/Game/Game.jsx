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
    // const gamesrdx = selectedGame;
    const title = selectedGame?.details;
    // const idgameid = selectedGame?.details.game_id
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //Hooks
    const [games, setGames] = useState([]);

    useEffect(() => {

        console.log("AQUIESTANLOSDATOQUEBUSCO", selectedGame)
        if (games.length === 0) {
            bringGamesbySportsCenter(selectedGame.details)
                .then((games) => {
                    setGames(games);
                })
                .catch((error) => console.error(error));
        }
    }, []);



    // const gameId = game.game_id;
    const email = credentials?.credentials?.email;
    const jwt = credentials?.credentials?.jwt;
    const idgameid = games.game_id
    const body = { email, title };
    const body2 = { email, idgameid }
    const dataBase = "http://localhost:3001";

    const rentGame = async (body2, jwt) => {
        console.log(games, "estossonlosgames");

        let res = await axios.post(dataBase + "/bookings/newBooking", body2, {
            headers: { Authorization: `Bearer ${jwt}` },
        });


        dispatch(addBooking({ bookings: res.data.resp }));
        navigate("/userBooking")
        return res;

    }




    const returnHome = () => {
        navigate("/");
    }

    if (games.length === 0) { return <div className="gameDesign">Este centro no tiene ningún partido activo</div>; }
    else if (games.length > 0) {

        return (
            <div className="containerDesign">

                <div className="sportDesign">
                    {games.map((game, index) => {
                        return (
                            <div
                                key={index}
                                className="gameShow">
                                <div className='gamesNumber'>
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

                                    <div onClick={() => rentGame(body2, jwt)} className='buttonDesign'>
                                        Reservar partido
                                    </div>

                                }

                            </div>
                        );
                    })}



                    <div onClick={() => returnHome()} className='buttonDesign'>
                        Volver a Home
                    </div>

                </div>
            </div>

        )

    } else {
        return (
            <div className="sportDesign">
                <div>Ha Habido un error</div>
                <div onClick={() => returnHome()} className='buttonDesign'>
                    Volver a Home
                </div>

            </div>


        )
    }


}
export default Game;