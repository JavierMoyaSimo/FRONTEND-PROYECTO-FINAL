import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../containers/User/userSlice';
import sportscentersSlice from '../containers/Sportscenters/sportscentersSlice';
import bookingSlice from '../containers/User/UserBooking/bookingSlice';
import  gameSlice  from '../containers/Game/gamesSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        sportscenter: sportscentersSlice,
        booking: bookingSlice,
        game: gameSlice,

    }

});