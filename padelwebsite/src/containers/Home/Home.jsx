import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringSportscenters } from "../../services/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { sportscenterData, addSportscenter } from "../Sportscenters/sportscentersSlice";
// import Container from 'react-bootstrap/Container';

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


            // <div className="containerDesign">
            <div className="container-fluid containerDesign">

                <SearchBar />
                <h1 className="row d-block m-auto hometitle">¡Haz click y entra para ver los partidos disponibles de tu centro deportivo!</h1>
                <div className="row d-flex flex-wrap p-2">
                    {sportscentersFromRdx.details.map((sportscenter, index) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 mt-4">
                                <div
                                    key={index}
                                    onClick={() => clickedSportscenter(sportscenter)}
                                    className="sportscenterShow col-12 mt-4 mb-4">
                                    <div className="idsportscenter col-12 mt-2 ">
                                        {sportscenter.sportscenter_id}
                                    </div>
                                    <img
                                        className="sportscenterPic col-8 mb-4"
                                        src={sportscenter.image}
                                    />

                                </div>
                            </div>

                        );
                    })}
                </div>

            </div>



        )


    } else {
        return (


            <div className="container-fluid containerDesign">

                <SearchBar />
                <h1 className="row d-block m-auto hometitle">¡Haz click y entra para ver los partidos disponibles de tu centro deportivo!</h1>
                <div className="row d-flex flex-wrap p-2">
                    {sportscenters.map((sportscenter, index) => {
                        return (

                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 mt-4">
                                <div
                                    key={index}
                                    onClick={() => clickedSportscenter(sportscenter)}
                                    className="sportscenterShow col-12 mt-4 mb-4">
                                    <div className="idsportscenter col-12 mt-2 ">
                                        {sportscenter.sportscenter_id}
                                    </div>
                                    <img
                                        className="sportscenterPic col-8 mb-4"
                                        src={sportscenter.image}
                                    />

                                </div>
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