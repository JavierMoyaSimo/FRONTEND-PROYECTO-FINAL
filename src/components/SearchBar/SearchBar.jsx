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
            
            
            dispatch(cleanSearch({ details: {} }))
        }
    }, [criteria]);

    return (
        <div className='container-fluid divInputDesign mb-4 mt-4'>
            <div className=" row search-box">
                <input type="text" name="criteria" className="input-search col-12" placeholder="Introduzca provincia para buscar polideportivo..." onChange={(e) => criteriaHandler(e)} />
            </div>

        </div>
    )




}


export default SearchBar;