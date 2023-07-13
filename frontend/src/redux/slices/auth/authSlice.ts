import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { TypedDispatch } from '../../store';
import { RootState } from '../../store';
import { setAxiosAuthToken } from './utils';
import { hasCookie,getCookie,setCookie,deleteCookie } from 'cookies-next';
type ProfileType = {
    plan: string;
}

// add user type
export type UserType = {
    pk: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: ProfileType;
}
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
    user: {
        pk: 0,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        profile: {
            plan: "unknown"
        }
    } as UserType,
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
        setUserInfo(state, action: PayloadAction<UserType>) {
            state.user = action.payload;
        },
    },
});

export default authSlice.reducer;
export const {
    setToken,
    setVerifyEmailStatus, // export new function
    setUserInfo, // export new function

} = authSlice.actions;

export const getUserInfo = (state: RootState) => state.auth.user;
export const getVerifyEmailStatus = (state: RootState) => state.auth.verifyEmailStatus;
export const getToken = (state: RootState) => state.auth.token;
export const getLoggedIn = (state: RootState) => state.auth.loggedIn;


export const registerUser =
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



export const loginUser =
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






        export const fetchUserInfo =
        () =>
            async (dispatch: TypedDispatch) => {
                try {
                    // do a GET request
                    const url = 'http://127.0.0.1:8000/api/auth/user/';
                    const { data } = await axios.get(url);
    
                    // set the user info in the store
                    dispatch(setUserInfo(data));
    
                } catch (error) {
                    console.error("Error occurred when fetching user information");
                }
    };
    

    export const resetPassword =
    (email: string) =>
        async (dispatch: TypedDispatch) => {
            try {

                const url = 'http://127.0.0.1:8000/api/auth/password/reset/';
                const data = { email }
                await axios.post(url, data);


            } catch (error) {
                console.error("Problems with password reset. Please try again or contact administrator.");
            }
        };



export const setNewPassword =
    (uid: string, token: string, password1: string, password2: string) =>
        async (dispatch: TypedDispatch) => {
            try {

                const url = 'http://127.0.0.1:8000/xapi/auth/password/reset/confirm/';
                const data = {
                    uid,
                    token,
                    new_password1: password1,
                    new_password2: password2,
                }
                await axios.post(url, data);

                console.log("New password set successfully");


            } catch (error) {

                const err = error as AxiosError

                type RegisterErrorType = {
                    non_field_errors?: string[];
                    uid?: string[];
                    token?: string[];
                    new_password1?: string[];
                    new_password2?: string[];

                };

                const data = err.response?.data as RegisterErrorType;

                if (data.non_field_errors) {
                    console.error(data.non_field_errors.join(" "));
                }
                if (data.uid) {
                    console.error("UID " + data.uid.join(" "));
                }
                if (data.token) {
                    console.error("Token " + data.token.join(" "));
                }
                if (data.new_password1) {
                    console.error("New Password 1 " + data.new_password1.join(" "));
                }
                if (data.new_password2) {
                    console.error("New Password 2 " + data.new_password2.join(" "));
                }
            }
        };




export const logout =
() =>
    async (dispatch: TypedDispatch) => {
        try {

            dispatch(setToken(""));
            dispatch(setUserInfo({} as UserType));

            const url = '/api/auth/logout/';
            await axios.post(url);

        } catch (error) {
            
        }
    };




    //
// the rest of the code ...
//

export const changePassword =
(oldPassword: string, password1: string, password2: string) =>
    async (dispatch: TypedDispatch) => {
        try {

            const url = 'http://127.0.0.1:8000/api/auth/password/change/';
            const data = {
                new_password1: password1,
                new_password2: password2,
                old_password: oldPassword
            }
            await axios.post(url, data);

            console.log("Password changed successfully")

        } catch (error) {

            const err = error as AxiosError

            type RegisterErrorType = {
                non_field_errors?: string[];
                new_password1?: string[];
                new_password2?: string[];
                old_password?: string[]
            };

            const data = err.response?.data as RegisterErrorType;

            if (data.non_field_errors) {
                console.error(data.non_field_errors.join(" "));
            }
            if (data.new_password1) {
                console.error(data.new_password1.join(" "));
            }
            if (data.new_password2) {
                console.error(data.new_password2.join(" "));
            }
            if (data.old_password) {
                console.error(data.old_password.join(" "));
            }
        }
    };