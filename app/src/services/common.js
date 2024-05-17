import axios from "axios";
import Constants from "../utils/constants";

const { REACT_APP_API_URL } = process.env; // Getting the API URL from environment variables

// Function to handle POST requests
export const Post = async ({ path, token = "", body = {} }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token; // Add token to headers if provided
  let result = { data: null, error: "" };

  await axios
    .post(`${REACT_APP_API_URL}/${path}`, body, { headers }) // Making a POST request
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data; // Setting data if request is successful
      }
    })
    .catch((err) => {
      result.error = err.response.data; // Setting error if request fails
    });

  return result;
};

// Function to handle GET requests
export const Get = async ({ path, token = "" }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token; // Add token to headers if provided
  let result = { data: null, error: "" };

  await axios
    .get(`${REACT_APP_API_URL}/${path}`, { headers }) // Making a GET request
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data; // Setting data if request is successful
      }
    })
    .catch((err) => {
      result.error = err.response.data; // Setting error if request fails
    });

  return result;
};

// Function to handle PUT requests
export const Put = async ({ path, token = "", body = {} }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token; // Add token to headers if provided
  let result = { data: null, error: "" };

  await axios
    .put(`${REACT_APP_API_URL}/${path}`, body, { headers }) // Making a PUT request
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data; // Setting data if request is successful
      }
    })
    .catch((err) => {
      result.error = err.response.data; // Setting error if request fails
    });

  return result;
};

// Function to handle DELETE requests
export const Delete = async ({ path, token = "" }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token; // Add token to headers if provided
  let result = { data: null, error: "" };

  await axios
    .delete(`${REACT_APP_API_URL}/${path}`, { headers }) // Making a DELETE request
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data; // Setting data if request is successful
      }
    })
    .catch((err) => {
      result.error = err.response.data; // Setting error if request fails
    });

  return result;
};
