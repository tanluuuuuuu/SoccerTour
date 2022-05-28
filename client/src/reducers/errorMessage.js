import { SET_ER_MESSAGE, CLR_ER_MESSAGE } from "../constants/actionTypes.js";

const erMessage = (erMessage = "", action) => {
    console.log(action.type);
    switch (action.type) {
        case SET_ER_MESSAGE:
            return new String(action.payload);
        case CLR_ER_MESSAGE:
            return new String("");
        default:
            return erMessage;
    }
};

export default erMessage;
