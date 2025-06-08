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
  updateStatus: (injectionId) => `/injections/${injectionId}/`,
  changePassword: (id) => `/users/${id}/change-password/`,
  currentUser: `/users/current-user/`,
  user: (id) => `/users/${id}/`,
  userManagement: "/users/",
  userInjections: (id) => `/users/${id}/injections/`,
  userCertificate: (injectionId) => `/injections/${injectionId}/certificate/`,
  campaignDetails: (campaignId) => `/campaigns/${campaignId}/`,
  historyDetails: (historyId) => `/injections/${historyId}/`,
  notification: "/notifications/all/",
  updateNotification: (notificationId) =>
    `/notifications/${notificationId}/mark-read/`,
  updateAllNotification: "/notifications/mark-all-read/",
  countNotification: "/notifications/unread-count/",
  payment: "/payment/",
  orderStatus: (orderId) => `/order-status/${orderId}/`,
  orders: "/orders/",
  fcmToken: "/users/update-fcm-token/",
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
