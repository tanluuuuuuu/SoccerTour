import axios from "axios";

const url = "http://localhost:5000/tour";
const userUrl = "http://localhost:5000/user";

export const fetchPlayers = (playerAddresses) =>
    axios.post(`${url}/players`, playerAddresses);

export const fetchTeams = () => axios.get(url);

export const fetchOneTeam = (teamId) => axios.get(`${url}/team/${teamId}`);

export const createTeam = (newTeam) =>
    axios.post(url, newTeam, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const acceptRegister = (data) =>
    axios.post(`${url}/acceptregister`, data, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const deleteRegister = (data) =>
    axios.post(`${url}/deleteregister`, data, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const createTour = (tourData) => axios.post(`${url}/calendar`, tourData);

export const fetchTour = () => axios.get(`${url}/calendar`);

export const updateCalendar = (calendar) =>
    axios.patch(`${url}/calendar`, calendar, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const updateMatch = (id, updateData) =>
    axios.put(`${url}/calendar/${id}`, updateData, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const updateMatchResult = (id, updateData) =>
    axios.put(`${url}/calendar/result/${id}`, updateData, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const getUserList = () =>
    axios.get(`${userUrl}/getUserList`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const CheckSignin = (token) =>
    axios.post(`${userUrl}/checksignin`, token, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

export const signin = (loginData) => axios.post(`${userUrl}/signin`, loginData);

export const signup = (userData) => axios.post(`${userUrl}/signup`, userData);

export const getRanking = () => axios.get(`${url}/ranking`);

export const getRankingPlayer = () => axios.get(`${url}/rankingPlayer`);

export const changeTourRule = (tourData) =>
    axios.patch(`${url}/rule`, tourData, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
