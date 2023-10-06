import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  register(context, credentials) {
    context.commit("registerStart");
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit("registerSuccess", response.data.user);
          // window.localStorage.setItem('accessToken', response.data.user.token)
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log("fail", result.response.data.errors);
          context.commit("registerFailure", result.response.data.errors);
        });
    });
  },
};
export default {
  state,
  actions,
  mutations,
  // getters
};
