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
