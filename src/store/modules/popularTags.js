import popularTagsApi from "@/api/popularTags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getPopularTagsStart: "[tags] Get PopularTags Start",
  getPopularTagsSuccess: "[tags] Get PopularTags Success",
  getPopularTagsFailure: "[tags] Get PopularTags Failure",
};

export const actionTypes = {
  getPopularTags: "[tags] Get PopularTags",
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, paylaod) {
    console.log("amelia", paylaod);
    state.isLoading = false;
    state.data = paylaod;
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagsStart);
      popularTagsApi.getPopularTags().then((tags) => {
        context.commit(mutationTypes.getPopularTagsSuccess, tags);
        resolve(tags);
      });
    }).catch(() => {
      context.commit(mutationTypes.getPopularTagsFailure);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
