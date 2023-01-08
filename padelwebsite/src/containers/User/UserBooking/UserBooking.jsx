import React, { useState, useEffect } from 'react';
import "./UserBooking.scss";
import { useSelector } from "react-redux";
import { bookingData } from "./bookingSlice";
import { userData } from "../userSlice";
import { useNavigate } from 'react-router-dom';
import { bringBookings, rentGame } from "../../../services/apiCalls";

const UserBooking = () => {

    const bookingsFromRdx = useSelector(bookingData);
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //Hooks
    const [bookings, setBookings] = useState([]);


    useEffect(() => {

        if (bookings.length === 0) {
            bringBookings(idUser, jwt)
                .then((bookings) => {
                    setBookings(bookings);
                })
                .catch((error) => console.error(error));
        }
    }, []);


    const booking = bookingsFromRdx;
    const email = credentials?.credentials?.email;
    const idUser = credentials?.credentials?.user_id;
    const jwt = credentials?.credentials?.jwt;
    const body = { email, booking };



    const returnHome = () => {

        navigate("/");
    }

    if (bookings.length === 0) {
        return <div className="orderDesign">No tienes ningún partido reservado</div>;
    } else if (bookings.length > 0) {

        return (
            <div className="containerDesign">

                <div className="orderDesign">
                    {bookings.map((booking) => {
                        return (
                            <div
                                onClick={() => returnHome(booking)}
                                className="orderShow">
                                <div className='moviesNumber'>
                                    <p className='pMovies'>Partido número:</p>
                                    {booking.gameGameId}

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>



        )
    } else {
        return (


            <div className="containerDesign">

                <div className="orderDesign">
                    {bookings.map((booking) => {
                        return (
                            <div
                                onClick={() => returnHome(booking)}
                                className="orderShow">
                                <div className='moviesNumber'>
                                    <p className='pMovies'>Partido número:</p>
                                    {booking.gameGameId}

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>



        )
    }

}
export default UserBooking;