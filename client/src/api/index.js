import axios from "axios";

const url = "http://localhost:5000/tour";
const userUrl = "http://localhost:5000/user";

const config = {
    header: {
        "Content-Type": "application/json",
    },
};

export const fetchPlayers = (playerAddresses) =>
    axios.post(`${url}/players`, playerAddresses);

export const fetchTeams = () => axios.get(url);

export const createTeam = (newTeam) => axios.post(url, newTeam);

export const acceptRegister = (data) => axios.post(`${url}/acceptregister`, data);

export const createTour = (tourData) => axios.post(`${url}/calendar`, tourData);

export const fetchTour = () => axios.get(`${url}/calendar`);

export const updateCalendar = (calendar) =>
    axios.patch(`${url}/calendar`, calendar);

export const updateMatch = (id, updateData) =>
    axios.put(`${url}/calendar/${id}`, updateData);

export const updateMatchResult = (id, updateData) =>
    axios.put(`${url}/calendar/result/${id}`, updateData);

export const getUserList = (token) =>
    axios.post(`${userUrl}/getUserList`, token, config);

export const CheckSignin = (token) =>
    axios.post(`${userUrl}/checksignin`, token, config);

export const signin = (loginData) =>
    axios.post(`${userUrl}/signin`, loginData, config);

export const signup = (userData) =>
    axios.post(`${userUrl}/signup`, userData, config);

export const getRanking = () => axios.get(`${url}/ranking`);

export const getRankingPlayer = () => axios.get(`${url}/rankingPlayer`);

export const changeTourRule = (tourData) =>
    axios.patch(`${url}/rule`, tourData);
