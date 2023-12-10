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

export const getAllSpecializations = async (values: any) => {
  const url = authBaseUrl + urls.getAllSpecializations;
  return axios.post(url, values, { ...authHeaders });
};

export const updateSpecializationsApi = async ({
  specializationId,
  item,
}: any) => {
  const url = authBaseUrl + urls.updateSpecialization + specializationId;
  return axios.put(url, { ...item }, { ...authHeaders });
};

export const deleteSpecializationApi = async (id: string) => {
  const url = authBaseUrl + urls.updateSpecialization + id;
  return axios.delete(url, { ...authHeaders });
};

export const addSpecializationApi = async (values: any) => {
  const url = authBaseUrl + urls.addSpecialization;
  return axios.post(url, values, { ...authHeaders });
};

export const getUserDetails = async (userId: string) => {
  const url = authBaseUrl + urls.getUserById + `/${userId}`;
  return axios.get(url, { ...authHeaders });
};

export const deactivateUser = async (userId: string) => {
  const url = authBaseUrl + urls.deactivateUserById + `/${userId}`;
  return axios.get(url, { ...authHeaders });
};
