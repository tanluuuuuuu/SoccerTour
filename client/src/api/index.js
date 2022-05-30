import axios from "axios";

const url = "http://localhost:5000/tour";
const userUrl = "http://localhost:5000/user";

export const fetchPlayers = (playerAddresses) =>
    axios.post(`${url}/players`, playerAddresses);

export const fetchTeams = () => axios.get(url);

export const fetchOneTeam = (teamId) => axios.get(`${url}/team/${teamId}`);

export const createTeam = (newTeam) => axios.post(url, newTeam, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});

export const acceptRegister = (data) => axios.post(`${url}/acceptregister`, data);

export const createTour = (tourData) => axios.post(`${url}/calendar`, tourData);

export const fetchTour = () => axios.get(`${url}/calendar`);

export const updateCalendar = (calendar) =>
    axios.patch(`${url}/calendar`, calendar);

export const updateMatch = (id, updateData) =>
    axios.put(`${url}/calendar/${id}`, updateData, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});

export const updateMatchResult = (id, updateData) =>
    axios.put(`${url}/calendar/result/${id}`, updateData, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});

export const getUserList = () => axios.post(`${userUrl}/getUserList`, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});

export const CheckSignin = (token) =>
    axios.post(`${userUrl}/checksignin`, token, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});

export const signin = (loginData) =>
    axios.post(`${userUrl}/signin`, loginData);

export const signup = (userData) =>
    axios.post(`${userUrl}/signup`, userData);

export const getRanking = () => axios.get(`${url}/ranking`);

export const getRankingPlayer = () => axios.get(`${url}/rankingPlayer`);

export const changeTourRule = (tourData) =>
    axios.patch(`${url}/rule`, tourData, {
    header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}` ,
    },
});
