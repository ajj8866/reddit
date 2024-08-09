import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/Users/usersSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;