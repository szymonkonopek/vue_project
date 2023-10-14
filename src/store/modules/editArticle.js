import articleApi from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  updateArticleStart: "[update art] upd Article Start",
  updateArticleSuccess: "[update art] upd Article Success",
  updateArticleFailure: "[update art] upd Article Failure",

  getArticleStart: "[get art] Get CreateArticle Start",
  getArticleSuccess: "[get art] Get CreateArticle Success",
  getArticleFailure: "[get art] Get CreateArticle Failure",
};

export const actionTypes = {
  updateArticle: "[update article] update article",
  getArticle: "[get article] get article",
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload.data.article;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.updateArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
