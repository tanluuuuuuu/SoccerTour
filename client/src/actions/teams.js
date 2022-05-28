import * as api from "../api/index.js";
import { FETCH_ALL_TEAM } from "../constants/actionTypes.js";

export const fetchTeams = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTeams();

        dispatch({ type: FETCH_ALL_TEAM, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
