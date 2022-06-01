import * as api from "../api/index.js";
import {
    SIGN_IN,
    SIGN_UP,
    GET_USER_LIST,
    CHECK_SIGN_IN,
    LOG_OUT,
    CLR_ER_MESSAGE,
    SET_ER_MESSAGE,
} from "../constants/actionTypes.js";

export const getUserList = () => async (dispatch) => {
    try {
        const { data } = await api.getUserList();

        dispatch({ type: GET_USER_LIST, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const checkSignIn = (token) => async (dispatch) => {
    try {
        const { data } = await api.CheckSignin(token);
        console.log("Logined");

        dispatch({ type: CHECK_SIGN_IN, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const signin = (loginData) => async (dispatch) => {
    try {
        loginData.username = loginData.userName;

        const { data } = await api.signin(loginData);
        localStorage.setItem("authToken", data.token);
        console.log("Logined");

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: SIGN_IN, payload: data });
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};

export const signup = (userData, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.signup(userData);
        setIsSuccess(true);

        localStorage.setItem("authToken", data.token);
        
        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: SIGN_UP, payload: data });
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOG_OUT, payload: null });
    window.location.reload(false);
};
