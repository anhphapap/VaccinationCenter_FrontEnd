import axios from "axios";

const BASE_URL = "https://vaccinationcenterbackend-production.up.railway.app/";

export const endpoints = {
  vaccines: "/vaccines/",
  categories: "/categories/",
  vac_cate: (cateId) => `/categories/${cateId}/vaccines/`,
};

export default axios.create({
  baseURL: BASE_URL,
});
