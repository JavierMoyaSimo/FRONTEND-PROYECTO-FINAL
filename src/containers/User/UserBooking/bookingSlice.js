import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: {}
    },
    reducers: {
        addBooking: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },


    }

});

export const { addBooking } = bookingSlice.actions;




export const bookingData = (state) => state.order;

export default bookingSlice.reducer;