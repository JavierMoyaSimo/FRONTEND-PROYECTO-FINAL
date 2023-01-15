import { createSlice } from '@reduxjs/toolkit';

export const sportscenterSlice = createSlice({
    name: 'sportscenter',
    initialState: {
        details: {},
        search: []
    },
    reducers: {
        addSportscenter: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        addSearch: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        cleanSearch: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }

});

export const { addSportscenter, addSearch, cleanSearch } = sportscenterSlice.actions;

export const sportscenterData = (state) => state.sportscenter;

export default sportscenterSlice.reducer;