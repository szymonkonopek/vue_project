import axios from "@/api/axios";

const getArticle = (apiUrl) => {
  return axios.get(apiUrl);
};

const deleteArticle = (slug) => {
  return axios.delete(`articles/${slug}`);
};

export default {
  getArticle,
  deleteArticle,
};
