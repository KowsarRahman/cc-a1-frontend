import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";

export const login = LoginRequest => async dispatch => {
    try {
      const res = await axios.post('https://cors-everywhere.herokuapp.com/http://login-microservice.us-east-1.elasticbeanstalk.com/api/users/login', LoginRequest);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      window.location.href = "/dashboard";
      dispatch({
        type: SET_CURRENT_USER,
        payload: [] 
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
};