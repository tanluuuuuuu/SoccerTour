import { GET_USER_LIST } from "../constants/actionTypes.js";

const userList = (state = [], action) => {
    switch (action.type) {
        case GET_USER_LIST: 
            return action.payload;
        default:
            return state;
    }
};

export default userList
