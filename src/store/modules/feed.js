import feedApi from "@/api/feed";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: "[feed] Get Feed Start",
  getFeedSuccess: "[feed] Get Feed Success",
  getFeedFailure: "[feed] Get Feed Failure",
};

export const actionTypes = {
  getFeed: "[feed] Get feed",
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
    console.log("start");
  },
  [mutationTypes.getFeedSuccess](state, paylaod) {
    state.isLoading = false;
    state.data = paylaod;
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getFeed](context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart, apiUrl);
      feedApi.getFeed(apiUrl).then((response) => {
        context.commit(mutationTypes.getFeedSuccess, response.data);
        resolve(response.data);
      });
    }).catch(() => {
      context.commit(mutationTypes.getFeedFailure);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
