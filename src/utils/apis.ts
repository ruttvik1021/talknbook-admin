import axios from "axios";
import { authBaseUrl, unAuthBaseUrl, urls } from "./urls";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Login Page

export const sendOtptoEmail = async (values: any) => {
  const url = unAuthBaseUrl + urls.sentOtp;
  return await axios.post(url, values);
};

export const loginFn = async (values: any) => {
  const url = unAuthBaseUrl + urls.validateOtp;
  return await axios.post(url, values);
};

export const getUsers = async (values: any) => {
  const url = authBaseUrl + urls.getAllUsers;
  return axios.post(url, values, { ...authHeaders });
};

export const getAllSpecializations = async () => {
  const url = authBaseUrl + urls.getAllSpecializations;
  return axios.get(url, { ...authHeaders });
};

export const getUserDetails = async (userId: string) => {
  const url = authBaseUrl + urls.getUserById + `/${userId}`;
  return axios.get(url, { ...authHeaders });
};

export const deactivateUser = async (userId: string) => {
  const url = authBaseUrl + urls.deactivateUserById + `/${userId}`;
  return axios.get(url, { ...authHeaders });
};
