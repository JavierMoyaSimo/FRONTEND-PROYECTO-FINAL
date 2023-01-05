import React from 'react';
import "./Sportscenters.scss";
import { useSelector, useDispatch } from "react-redux";
import { sportscenterData } from "./sportscenterSlice";
import { addBooking, bookingData } from "../User/UserBooking/bookingSlice";
import { userData } from "../User/userSlice";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Sportscenter = () => {

    const dispatch = useDispatch();
    const selectedSportscenter = useSelector(bookingData);
    const credentials = useSelector(userData);
    const navigate = useNavigate();


    const title = selectedSportscenter?.sportscenter_id;
    const email = credentials?.credentials?.email;
    const jwt = credentials?.credentials?.jwt;
    const body = { email, title };
    const dataBase = "http://localhost:3001";

    const watchMe = async (body, jwt) => {

        let res = await axios.post(dataBase + "/orders/newOrderMovie", body, {
            headers: { Authorization: `Bearer ${jwt}` },
        });


        dispatch(addBooking({ bookings: res.data.resp }));
        navigate("/userBooking")
        return res;

    }




    const returnHome = () => {
        navigate("/");
    }

    if (selectedSportscenter?.sportscenter_id !== undefined) {

        return (
            <div className="filmDesign">
                {selectedSportscenter?.sportscenter_id}
                <img className="filmPic" src={selectedSportscenter?.image} />

                {credentials?.credentials?.jwt !== undefined &&

                    <div onClick={() => watchMe(body, jwt)} className='buttonDesign'>
                        Watch sportscenter games
                    </div>

                }
                <div onClick={() => returnHome()} className='buttonDesign'>
                    Volver a Home
                </div>

            </div>
        )

    } else {
        return (
            <div className="filmDesign">
                <div>Ha Habido un error</div>
                <div onClick={() => returnHome()} className='buttonDesign'>
                    Volver a Home
                </div>

            </div>


        )
    }


}
export default Sportscenter;