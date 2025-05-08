import axios from "axios";
import { BASE_URL } from "@env";

export const endpoints = {
  vaccines: "/vaccines/",
  vaccineDetails: (vaccineId) => `/vaccines/${vaccineId}/`,
  categories: "/categories/",
  vac_cate: (cateId) => `/categories/${cateId}/vaccines/`,
  register: "/user/",
  login: "/o/token/",
  campaigns: "/campaigns/",
  injections: "/injections/",
  changePassword: (username) => `/user/${username}/change-password/`,
  currentUser: (username) => `user/${username}/`,
  userInjections: (username) => `user/${username}/injections/`,
  campaignDetails: (campaignId) => `/campaigns/${campaignId}/`,
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
