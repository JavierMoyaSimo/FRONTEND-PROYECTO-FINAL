import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        details: {},
        search: []
    },
    reducers: {
        addGame: (state, action) => {
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

export const { addGame, addSearch, cleanSearch } = gameSlice.actions;

export const gameData = (state) => state.game;

export default gameSlice.reducer;