import axios from "@/api/axios";

const getArticle = (apiUrl) => {
  return axios.get(apiUrl);
};

const deleteArticle = (slug) => {
  return axios.delete(`articles/${slug}`);
};

const createArticle = (articleInput) => {
  return axios
    .post("/articles", { article: articleInput })
    .then((response) => response.data.article);
};

const updateArticle = (slug, articleInput) => {
  return axios
    .put(`/articles/${slug}`, { article: articleInput })
    .then((response) => response.data.article);
};

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
