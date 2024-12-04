import axios from 'axios';
import { BASEURL } from '../constants/constants';

const login = async (email, password) => {
    const response = await axios.post(`${BASEURL}/login`, {
        email: email,
        password: password
    },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.data) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }
    return true;
};

const signup = async (firstname, lastname, email, password) => {
    const response = await axios.post(`${BASEURL}/signup`, {
        first_name : firstname,
        last_name : lastname,
        email: email,
        password: password,
        picture: "https://localhost:3000/images/profile.png"
    },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return true;
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post(`${BASEURL}/token/refresh`, {
        refresh: refreshToken
    });
    if (response.data) {
        localStorage.setItem('access_token', response.data.access);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const isLoggedIn = () => {
    const token = localStorage.getItem('access_token');
    return token !== null;
};

const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export default {
    isLoggedIn,
    login,
    signup,
    refreshAccessToken,
    logout,
    getAccessToken
};
