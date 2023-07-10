import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TypedDispatch } from '../../store';
import { RootState } from '../../store';
import { setAxiosAuthToken } from './utils';
import { hasCookie,getCookie,setCookie,deleteCookie } from 'cookies-next';

// loading token from localStorage
let initToken = null;
if (hasCookie("token")) {
    initToken = getCookie("token");
    setAxiosAuthToken(initToken as string);
}

const initialState = {
    token: initToken as string | null, // add token variable
    verifyEmailStatus: "unknown", // new variable in the store
    loggedIn: false as boolean | null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setVerifyEmailStatus(state, action: PayloadAction<string>) {
            state.verifyEmailStatus = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
            setAxiosAuthToken(state.token);
            if (state.token) {
                setCookie("token", state.token);
                state.loggedIn = true;
            } else {
                deleteCookie("token")
                state.loggedIn = false;
            }
        },
    },
});

export default authSlice.reducer;
export const {
    setToken,
    setVerifyEmailStatus, // export new function
    //
} = authSlice.actions;


export const getVerifyEmailStatus = (state: RootState) => state.auth.verifyEmailStatus;
export const getToken = (state: RootState) => state.auth.token;
export const getLoggedIn = (state: RootState) => state.auth.loggedIn;


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



export const verifyEmail =
    (key: string) =>
        async (dispatch: TypedDispatch) => {
            try {
                // set status to started 
                dispatch(setVerifyEmailStatus("started"));

                // send POST request
                const url = "http://127.0.0.1:8000/api/auth/register/verify-email/";
                await axios.post(url, { key });

                // set verify email status to ok
                dispatch(setVerifyEmailStatus("ok"));
            } catch (error) {
                // set status to error
                dispatch(setVerifyEmailStatus("error"));
            }
};



export const login =
    (email: string, password: string) =>
        async (dispatch: TypedDispatch) => {
            try {

                const url = 'http://127.0.0.1:8000/api/auth/login/';
                const { data } = await axios.post(url, { email, password });

                dispatch(setToken(data.key));
                
                // redirect ...

            } catch (error) {
                console.error("Problem during login. Please try again.");
            }
        };