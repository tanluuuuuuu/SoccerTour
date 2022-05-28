import * as api from "../api/index.js";
import { FETCH_ALL_PLAYER } from "../constants/actionTypes.js";

export const fetchPlayers = (playerAddresses) => async (dispatch) => {
    try {
        const { data } = await api.fetchPlayers(playerAddresses);

        dispatch({ type: FETCH_ALL_PLAYER, payload: data });
    } catch (error) {
        console.log(error);
    }
};
