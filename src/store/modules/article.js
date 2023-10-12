import articleApi from "@/api/article";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[Article] Get Article Start",
  getArticleSuccess: "[Article] Get Article Success",
  getArticleFailure: "[Article] Get Article Failure",
};

export const actionTypes = {
  getArticle: "[Article] Get Article",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, paylaod) {
    state.isLoading = false;
    state.data = paylaod;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getArticle](context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, apiUrl);
      articleApi.getArticle(apiUrl).then((response) => {
        context.commit(mutationTypes.getArticleSuccess, response.data.article);
        resolve(response.data.article);
      });
    }).catch(() => {
      context.commit(mutationTypes.getArticleFailure);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
