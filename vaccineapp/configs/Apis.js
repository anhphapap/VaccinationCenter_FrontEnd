import axios from "axios";
import { BASE_URL } from "@env";

export const endpoints = {
  vaccines: "/vaccines/",
  vaccineDetails: (vaccineId) => `/vaccines/${vaccineId}/`,
  categories: "/categories/",
  vac_cate: (cateId) => `/categories/${cateId}/vaccines/`,
  register: "/users/",
  login: "/o/token/",
  campaigns: "/campaigns/",
  injections: "/injections/",
  changePassword: (username) => `/users/${username}/change-password/`,
  currentUser: `/users/current-user/`,
  user: (id) => `/users/${id}/`,
  userInjections: (username) => `/users/${username}/injections/`,
  userCertificate: (username, injectionId) =>
    `/users/${username}/injection-certificate/${injectionId}/`,
  campaignDetails: (campaignId) => `/campaigns/${campaignId}/`,
  historyDetails: (historyId) => `/injections/${historyId}/`,
  notification: "/notifications/all/",
  updateNotification: (notificationId) =>
    `/notifications/${notificationId}/mark-read/`,
  updateAllNotification: "/notifications/mark-all-read/",
  countNotification: "/notifications/unread-count/",
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
