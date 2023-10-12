import axios from "@/api/axios";

const getArticle = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getArticle,
};
