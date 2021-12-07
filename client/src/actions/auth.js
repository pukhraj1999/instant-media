import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    const action = { type: "AUTH", payload: data };
    dispatch(action);
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    const action = { type: "AUTH", payload: data };
    dispatch(action);
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const signout = () => async (dispatch) => {
  try {
    const action = { type: "LOGOUT", payload: null };
    dispatch(action);
  } catch (err) {
    console.log(err.message);
  }
};
