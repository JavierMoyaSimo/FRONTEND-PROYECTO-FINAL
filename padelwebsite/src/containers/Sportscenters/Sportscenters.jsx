import React from 'react';
import "./Sportscenters.scss";
import { useSelector, useDispatch } from "react-redux";
import { sportscenterData } from "./sportscentersSlice";
import { addGame } from "../Game/gamesSlice";
import { userData } from "../User/userSlice";
import { useNavigate } from 'react-router-dom';


const Sportscenter = () => {

    const dispatch = useDispatch();
    const selectedSportscenter = useSelector(sportscenterData);
    const credentials = useSelector(userData);
    const navigate = useNavigate();


    const title = selectedSportscenter?.sportscenter_id;
    // const email = credentials?.credentials?.email;
    // const jwt = credentials?.credentials?.jwt;
    // const body = { email, title };
    // const dataBase = "http://localhost:3001";

    const watchMe = (title) => {

        dispatch(addGame({ ...title, details: title }));

        setTimeout(() => {
            navigate("/game");
        }, 750);
    };




    const returnHome = () => {
        navigate("/");
    }

    if (selectedSportscenter?.sportscenter_id !== undefined) {

        return (
            <div className="sportDesign">
                {selectedSportscenter?.sportscenter_id}
                <img className="sportPic" src={selectedSportscenter?.image} />
                {selectedSportscenter?.description}


                {credentials?.credentials?.jwt !== undefined &&

                    <div onClick={() => watchMe(title)} className='buttonDesign'>
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
            <div className="sportDesign">
                <div>Ha Habido un error</div>
                <div onClick={() => returnHome()} className='buttonDesign'>
                    Volver a Home
                </div>

            </div>


        )
    }


}
export default Sportscenter;