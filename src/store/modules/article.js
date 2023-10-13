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

  deleteArticleStart: "[Article] delete Article Start",
  deleteArticleSuccess: "[Article] delete Article Success",
  deleteArticleFailure: "[Article] delete Article Failure",
};

export const actionTypes = {
  getArticle: "[Article] Get Article",
  deleteArticle: "[Article] delete Article",
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

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
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

  [actionTypes.deleteArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart);
      articleApi.deleteArticle(slug).then(() => {
        context.commit(mutationTypes.deleteArticleSuccess);
        resolve();
      });
    }).catch(() => {
      context.commit(mutationTypes.deleteArticleFailure);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
