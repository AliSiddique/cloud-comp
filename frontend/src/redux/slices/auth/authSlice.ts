import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TypedDispatch } from '../../store';

const initialState = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default authSlice.reducer;


export const register =
    (username: string, email: string, password1: string, password2: string) =>
        async (dispatch: TypedDispatch) => {
            try {
                const url = 'http://127.0.0.1:8000/api/auth/register/';
                await axios.post(url, { username, email, password1, password2 });
            } catch (error) {
                console.log(error);
            }
};