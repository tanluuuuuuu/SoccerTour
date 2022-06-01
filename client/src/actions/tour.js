import * as api from "../api/index.js";
import {
    FETCH_ALL_TOUR,
    UPDATE_CALENDAR,
    CREATE_TOUR,
    CREATE_TEAM,
    FETCH_RANKING_TEAM,
    FETCH_RANKING_PLAYER,
    SET_ER_MESSAGE,
    CLR_ER_MESSAGE,
    CHANGE_TOUR_RULE,
    ACCEPT_REGISTER,
    DELETE_REGISTER,
    END_TOUR
} from "../constants/actionTypes.js";

export const createTeam = (team) => async (dispatch) => {
    try {
        const { data } = await api.createTeam(team);

        console.log(`send dispatch ${CLR_ER_MESSAGE}`);
        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: CREATE_TEAM, payload: data });
    } catch (error) {
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};

export const createTour = (tourData) => async (dispatch) => {
    try {
        const { data } = await api.createTour(tourData);

        dispatch({ type: CREATE_TOUR, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const fetchTour = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTour();

        dispatch({ type: FETCH_ALL_TOUR, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const updateCalendar = (calendar) => async (dispatch) => {
    try {
        const { data } = await api.updateCalendar(calendar);

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: UPDATE_CALENDAR, payload: data });
    } catch (error) {
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
};

export const getRanking = () => async (dispatch) => {
    try {
        const { data } = await api.getRanking();

        dispatch({ type: FETCH_RANKING_TEAM, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const getRankingPlayer = () => async (dispatch) => {
    try {
        const { data } = await api.getRankingPlayer();

        dispatch({ type: FETCH_RANKING_PLAYER, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const changeTourRule = (tourData) => async (dispatch) => {
    try {
        const { data } = await api.changeTourRule(tourData);

        dispatch({ type: CHANGE_TOUR_RULE, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const acceptRegister = (team) => async (dispatch) => {
    try {
        const { data } = await api.acceptRegister(team);

        dispatch({ type: ACCEPT_REGISTER, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
}

export const deleteRegister = (team) => async (dispatch) => {
    try {
        const { data } = await api.deleteRegister(team);

        dispatch({ type: DELETE_REGISTER, payload: data });
    } catch (error) {
        console.log(error.response.data);
    }
}

export const endTour = () => async (dispatch) => {
    try {
        const { data } = await api.endTour();

        dispatch({ type: CLR_ER_MESSAGE, payload: null });
        dispatch({ type: END_TOUR, payload: data });
    } catch (error) {
        dispatch({ type: SET_ER_MESSAGE, payload: error.response.data });
    }
}