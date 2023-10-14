import articleApi from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[CreateArticle] Get CreateArticle Start",
  createArticleSuccess: "[CreateArticle] Get CreateArticle Success",
  createArticleFailure: "[CreateArticle] Get CreateArticle Failure",
};

export const actionTypes = {
  createArticle: "[CreateArticle] CreateArticle",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
    state.data = null;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle](context, { articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
