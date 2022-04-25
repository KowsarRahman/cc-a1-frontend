import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER, GET_PERSON} from "./types";

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

export const getPerson = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://login-microservice.us-east-1.elasticbeanstalk.com/api/users/getUsers/${id}`);

    //Getting the user information 
    const { phone_number } = res.data;
    const { role } = res.data;
    localStorage.setItem("role", role);
    localStorage.setItem("phone_number", phone_number);
    history.push("/dashboard");
    dispatch({
      type: GET_PERSON,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

