import React, { useState, useEffect } from "react";
import { addSearch, cleanSearch } from "../../containers/Sportscenters/sportscentersSlice";
import { searchSportscenters } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import './SearchBar.scss'


const SearchBar = () => {

    const dispatch = useDispatch();

    //HOOK
    const [criteria, setCriteria] = useState('');


    //HANDLER
    const criteriaHandler = (e) => {
        setCriteria(e.target.value);
    }



    useEffect(() => {

        if (criteria !== '') {

            
            const bring = setTimeout(() => {
                searchSportscenters(criteria)
                    .then(res => {
                        

                        
                        dispatch(addSearch({ details: res}))
                        
                    })
                    .catch(error => console.error((error)));
            }, 350);
            return () => clearTimeout(bring);

        } else if (criteria === '') {
            //Guardo en RDX sportscenters vacíos...
            dispatch(cleanSearch({ details: {} }))
        }
    }, [criteria]);

    return (
        <div className='divInputDesign'>
            <div className="search-box">
                <button className="btn-search"><i className="fas fa-search"></i></button>
                <input type="text" name="criteria" className="input-search" placeholder="Insert province to search for sportscenters..." onChange={(e) => criteriaHandler(e)} />
            </div>

        </div>
    )




}


export default SearchBar;