import {
    FETCH_ONE_TEAM
} from "../constants/actionTypes.js";

const team = (team = null, action) => {
    console.log(action.type);
    switch (action.type) {
        case FETCH_ONE_TEAM:
            console.log("Fetch one team successfully");
            return action.payload;
        default:
            return team;
    }
};

export default team;
