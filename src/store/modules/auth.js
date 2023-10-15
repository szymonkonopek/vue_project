import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  isLoading: false,
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

  getCurrentUserStart: "[auth] Get current user start",
  getCurrentUserSuccess: "[auth] Get current user Success",
  getCurrentUserFailure: "[auth] Get current user Failure",

  updateCurrentUserStart: "[auth] update current user start",
  updateCurrentUserSuccess: "[auth] update current user Success",
  updateCurrentUserFailure: "[auth] update current user Failure",

  logout: "[auth] logout",
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
    console.log("error2");
  },

  [mutationType.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationType.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationType.getCurrentUserFailure](state) {
    state.isLoading = true;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
  [mutationType.updateCurrentUserStart]() {},
  [mutationType.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationType.updateCurrentUserFailure]() {},
  [mutationType.logout]() {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

export const actionTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
  getCurrentUser: "[auth] GetCurrentUser",
  updateCurrentUser: "[auth] UpdateCurrentUser",
  logout: "[auth] logout",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return state.isLoggedIn;
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
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
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log("error", result.response.data.errors);
          context.commit(
            mutationType.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    context.commit(mutationType.getCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationType.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationType.getCurrentUserFailure);
        });
    });
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    context.commit(mutationType.updateCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationType.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch((result) => {
          context.commit(
            mutationType.updateCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem("accessToken", "");
      context.commit(mutationType.logout);
      resolve();
    });
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
