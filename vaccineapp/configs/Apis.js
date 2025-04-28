import axios from "axios";

const BASE_URL = "https://vaccinationcenter-backend.onrender.com/";

export const endpoints = {
  vaccines: "/vaccines/",
  categories: "/categories/",
  vac_cate: (cateId) => `/categories/${cateId}/vaccines/`,
  register: "/user/",
  login: "/o/token/",
  "current-user": (username) => `user/${username}/`,
};

export const authApis = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axios.create({
  baseURL: BASE_URL,
});
