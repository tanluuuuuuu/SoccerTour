import * as api from "../api/index.js";
import { UPDATE_MATCH, UPDATE_MATCH_RESULT, SET_ER_MESSAGE, CLR_ER_MESSAGE } from "../constants/actionTypes.js";
export const updateMatch = (id, match) => async (dispatch) => {
    try {
        const { data } = await api.updateMatch(id, match);

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: UPDATE_MATCH, payload: data });
    } catch (error) {
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};

export const updateMatchResult = (id, resultData) => async (dispatch) => {
    try {
        const { data } = await api.updateMatchResult(id, resultData);

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: UPDATE_MATCH_RESULT, payload: data });
    } catch (error) {
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};
