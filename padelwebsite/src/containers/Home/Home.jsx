import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringSportscenters } from "../../services/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { sportscenterData, addSportscenter } from "../Sportscenters/sportscentersSlice";


import "./Home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";


const Home = () => {

    const sportscentersFromRdx = useSelector(sportscenterData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Hooks
    const [sportscenters, setSportscenters] = useState([]);

    useEffect(() => {

        if (sportscenters.length === 0) {
            bringSportscenters()
                .then((sportscenters) => {
                    setSportscenters(sportscenters);
                })
                .catch((error) => console.error(error));
        }
    }, []);

    const clickedSportscenter = (sportscenter) => {

        dispatch(addSportscenter({ ...sportscenter, details: sportscenter }));

        setTimeout(() => {
            navigate("/sportscenter");
        }, 750);
    };

    if (sportscenters.length === 0) {
        return <div className="homeDesign">Ha habido un error</div>;
    } else if (sportscentersFromRdx.details.length > 0) {


        return (


            <div className="containerDesign">

                <SearchBar />
                <h1 className="titleDesign">¡Haz clic y entra para ver los partidos disponibles para tu centro deportivo!</h1>
                <div className="homeDesign">
                    {sportscentersFromRdx.details.map((sportscenter, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => clickedSportscenter(sportscenter)}
                                className="sportscenterShow">
                                <img
                                    className="sportscenterPic"
                                    src={sportscenter.image}
                                />

                            </div>
                        );
                    })}
                </div>

            </div>



        )


    } else {
        return (


            <div className="containerDesign">

                <SearchBar />
                <h1 className="titleDesign">¡Haz clic y entra para ver los partidos disponibles para tu centro deportivo!</h1>
                <div className="homeDesign">
                    {sportscenters.map((sportscenter, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => clickedSportscenter(sportscenter)}
                                className="sportscenterShow">
                                <img
                                    className="sportscenterPic"
                                    src={sportscenter.image}
                                />
                                
                            </div>
                        );
                    })}
                </div>

            </div>



        )
    }
}
    ;
export default Home;