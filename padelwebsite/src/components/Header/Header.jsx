import React from 'react';
import { useSelector } from "react-redux";
import { userData } from "../../containers/User/userSlice";
import './Header.scss'
import { useNavigate } from 'react-router-dom';






const Header = () => {


    const navigate = useNavigate();
    const userReduxCredentials = useSelector(userData);




    if (userReduxCredentials?.credentials?.jwt !== undefined) {


        return (
            <div className='headerDesign'>
                <div className='headerCenter'>
                    <div className='propadel'>PROPADEL</div>
                </div>

                <div className='headerLeft'>
                    <div className='titleDesign1' onClick={() => navigate('/')}>Home</div>
                </div>

                <div className='headerRight'>
                    <div onClick={() => navigate("/profile")} className="linkDesign">{userReduxCredentials?.credentials?.name}</div>
                </div>


            </div>
        )
    } else {


        return (
            <div className='headerDesign'>
                <div className='headerCenter'>
                    <div className='propadel'>PROPADEL</div>
                </div>

                <div className='headerLeft'>
                    <div className='titleDesign1' onClick={() => navigate('/')}>Home</div>
                </div>

                <div className='headerRight'>
                    <div onClick={() => navigate('/login')} className="linkDesign">Login</div>

                    <div onClick={() => navigate('/register')} className="linkDesign">Register</div>
                </div>


            </div>
        )
    }


}
export default Header;