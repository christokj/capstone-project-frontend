import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginSuccess } from './features/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});


const token = localStorage.getItem('token');
if (token) {
    
    store.dispatch(loginSuccess({ token }));
}

// export default store;
