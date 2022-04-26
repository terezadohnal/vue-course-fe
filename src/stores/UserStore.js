import { defineStore } from "pinia";
import axios from "axios";
import config from "../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    isLoggingIn: false,
    error: null,
    loginMessage: null,
    afterLoginRoute: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
    user: (state) => jwtDecode(state.token),
  },

  actions: {
    async login(username, password) {
      try {
        this.isLoggingIn = true;
        const data = { username, password };

        const response = await axios.post(
          config.backendUrl + "/user/login",
          data
        );
        this.token = response.data.token;
        axios.defaults.headers.common["Authorization"] = "Bearer" + this.token; // globalne do celeho axiosu to prida token
        this.error = null;
        this.isLoggingIn = false;
      } catch (e) {
        console.error(e);
        this.error = "Cannot log in";
      }
    },

    setLoginMessage(message) {
      this.loginMessage = message;
    },

    setAfterLoginRoute(route) {
      this.afterLoginRoute = route;
    },

    logout() {
      this.token = null;
      delete axios.defaults.headers.common["Authorization"];
    },

    clearError() {
      this.error = null;
    },
  },
});
