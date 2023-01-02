import axios from "axios";
import store from "../store";
import router from "../router";

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      const token = store.getters.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      if (error.response.status === 401) {
        router.push("/login");
        store.commit("setToken", "");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}
