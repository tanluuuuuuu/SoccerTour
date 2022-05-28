import { CHECK_SIGN_IN, LOG_OUT, SIGN_IN, SIGN_UP } from "../constants/actionTypes.js";

const initializeUserData = {
    phoneNumber: "",
    country: "",
    userName: "",
    password: "",
    token: "",
    role: "",
    isLogin: false,
};

const user = (state = initializeUserData, action) => {
    switch (action.type) {
        case LOG_OUT:
            window.location.reload(false);
            return {...initializeUserData}
        case CHECK_SIGN_IN:
            console.log(action.payload);
            return {...action.payload, isLogin: true};
        case SIGN_IN:
            return {...action.payload, isLogin: true};
        case SIGN_UP:
            return state;
        default:
            return state;
    }
};

export default user;
