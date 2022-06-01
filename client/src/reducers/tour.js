import {
    FETCH_ALL_TOUR,
    UPDATE_CALENDAR,
    UPDATE_MATCH,
    UPDATE_MATCH_RESULT,
    CREATE_TOUR,
    CREATE_TEAM,
    FETCH_ALL_PLAYER,
    FETCH_RANKING_TEAM,
    FETCH_RANKING_PLAYER,
    CHANGE_TOUR_RULE,
    ACCEPT_REGISTER,
    DELETE_REGISTER,
} from "../constants/actionTypes.js";

const tour = (tour = {}, action) => {
    console.log(action.type);
    switch (action.type) {
        case CREATE_TEAM:
            console.log("Saved team in register list in reducer");
            return { ...tour, registerList: action.payload};
        case CREATE_TOUR:
            console.log("Saved tour in reducer");
            return action.payload;
        case FETCH_ALL_TOUR:
            return action.payload;
        case UPDATE_CALENDAR:
            console.log("Updated calendar in tour");
            return action.payload;
        case UPDATE_MATCH:
            for (let homeOrAway of ["awayMatches", "homeMatches"]) {
                for (const round in tour.calendar[homeOrAway]) {
                    for (const match in tour.calendar[homeOrAway][round]
                        .matches) {
                        if (
                            tour.calendar[homeOrAway][round].matches[match]
                                ._id === action.payload._id
                        ) {
                            tour.calendar[homeOrAway][round].matches[match] =
                                action.payload;
                            console.log("Updated Data in reducer");
                            return { ...tour };
                        }
                    }
                }
            }
            return tour;
        case UPDATE_MATCH_RESULT:
            for (let homeOrAway of ["awayMatches", "homeMatches"]) {
                for (const round in tour.calendar[homeOrAway]) {
                    for (const match in tour.calendar[homeOrAway][round]
                        .matches) {
                        if (
                            tour.calendar[homeOrAway][round].matches[match]
                                .result._id === action.payload._id
                        ) {
                            tour.calendar[homeOrAway][round].matches[
                                match
                            ].result = action.payload;
                            console.log("Updated result in reducer");
                            return { ...tour };
                        }
                    }
                }
            }
            return tour;
        case FETCH_ALL_PLAYER:
            tour.players = action.payload;
            return { ...tour };
        case FETCH_RANKING_TEAM:
            tour.ranking = action.payload;
            return { ...tour };
        case FETCH_RANKING_PLAYER:
            tour.rankingPlayer = action.payload;
            return { ...tour };
        case CHANGE_TOUR_RULE:
            return { ...tour, ...action.payload };
        case ACCEPT_REGISTER:
            return { ...tour, ...action.payload };
        case DELETE_REGISTER:
            return { ...tour, registerList: action.payload};
        default:
            return tour;
    }
};

export default tour;
