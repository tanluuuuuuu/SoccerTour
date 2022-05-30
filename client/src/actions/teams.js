import * as api from "../api/index.js";
import { FETCH_ALL_TEAM, FETCH_ONE_TEAM, SET_ER_MESSAGE, CLR_ER_MESSAGE } from "../constants/actionTypes.js";

export const fetchTeams = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTeams();

        dispatch({ type: FETCH_ALL_TEAM, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchOneTeam = (teamId) => async (dispatch) => {
    try {
        const { data } = await api.fetchOneTeam(teamId);

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: FETCH_ONE_TEAM, payload: data });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: SET_ER_MESSAGE, payload: error.message });
    }
};

