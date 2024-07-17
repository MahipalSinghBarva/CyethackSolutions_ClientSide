import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/UserConstants";


import axios from "axios"
import Cookies from "js-cookie";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`https://cyethacksolutions-serverside.onrender.com/v1/api/login`, { email, password }, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    console.log(data.user);

    Cookies.set("id", data.user._id);
    Cookies.set("token", data.token);
    localStorage.setItem("JWTToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));

  } catch (error) {
    console.error('Login failed: ', error.response.data.message);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
}

export const register = (username,
  email,
  password) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(`https://cyethacksolutions-serverside.onrender.com/v1/api/register`, {
        username,
        email,
        password
      }, config);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem('JWTToken');
  localStorage.removeItem('userData');

  Cookies.remove('token');
  Cookies.remove('id');
  sessionStorage.removeItem('item_id');

  dispatch({ type: LOGOUT });
};