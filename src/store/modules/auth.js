import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

export const mutationType = {
  registerStart: "[auth] Register start",
  registerSuccess: "[auth] Register success",
  registerFailure: "[auth] Register failure",

  loginStart: "[auth] Login start",
  loginSuccess: "[auth] Login Success",
  loginFailure: "[auth] Login Failure",
};

const mutations = {
  [mutationType.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationType.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationType.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationType.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationType.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationType.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export const actionTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
};

const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationType.registerStart);
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationType.registerSuccess, response.data.user);
          // window.localStorage.setItem('accessToken', response.data.user.token)
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log("fail", result.response.data.errors);
          context.commit(
            mutationType.registerFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    context.commit(mutationType.loginStart);
    return new Promise((resolve) => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationType.loginSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationType.loginFailure,
            result.response.data.errors
          );
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
