import { combineReducers } from "redux";

import tour from "./tour.js";
import user from "./user.js";
import erMessage from "./errorMessage.js";
import userList from "./userList.js";

export default combineReducers({
    tour: tour,
    user: user,
    userList: userList,
    erMessage: erMessage,
});
