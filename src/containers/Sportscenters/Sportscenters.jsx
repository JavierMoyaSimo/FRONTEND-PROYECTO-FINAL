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


    const title = selectedSportscenter?.details?.sportscenter_id;
   

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
            
            <div className="container-fluid  descriptiontext">
                <div className='row sportsDesigns'>
                    <div className='col-lg-6 col-md-6 col-sm-12 twodivs leftdiv'>
                        {selectedSportscenter?.sportscenter_id}
                        <img className="sportPic" src={selectedSportscenter?.image} />
                        <div onClick={() => returnHome()} className='sportscenterbutton'>
                            Volver a Home
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 twodivs mb-2'>
                        {selectedSportscenter?.description}
                        {credentials?.credentials?.jwt !== undefined &&

                            <div onClick={() => watchMe(title)} className='sportscenterbutton'>
                                Ver partidos
                            </div>

                        }

                    </div>
                </div>




            </div>
        )

    } else {
        return (
            
            <div className="container-fluid descriptiontext sportsDesigns">
                <div></div>
                <div onClick={() => returnHome()} className='sportscenterbutton'>
                    Volver a Home
                </div>

            </div>


        )
    }


}
export default Sportscenter;