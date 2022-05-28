import * as api from "../api/index.js";
import { SIGN_IN, SIGN_UP, GET_USER_LIST, CHECK_SIGN_IN, LOG_OUT } from "../constants/actionTypes.js";

export const getUserList = (token) => async (dispatch) => {
    try {
        const {data} = await api.getUserList(token);

        dispatch({type: GET_USER_LIST, payload: data});
    } catch (error) {
        console.log(error.response.data);
    }
};

export const checkSignIn = (token) => async (dispatch) => {
    try {        
        const {data} = await api.CheckSignin(token);
        console.log("Logined");

        dispatch({type: CHECK_SIGN_IN, payload: data});
    } catch (error) {
        console.log(error.response.data);
    }
};

export const signin = (loginData) => async (dispatch) => {
    try {
        loginData.username = loginData.userName
        
        const {data} = await api.signin(loginData);
        console.log("Logined");

        localStorage.setItem("authToken", data.token)

        dispatch({type: SIGN_IN, payload: data});
    } catch (error) {
        console.log(error.response.data);
    }
};

export const signup = (userData, setIsSuccess) => async (dispatch) => {
    try {
        const {data} = await api.signup(userData);
        setIsSuccess(true)
        localStorage.setItem("authToken", data.token)
        dispatch({ type: SIGN_UP, payload: data });
    } catch (error) {
        alert(error.response.data)
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOG_OUT, payload: null })
};