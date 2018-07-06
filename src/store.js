import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedPoems: null,
    error: null,
    randomIndex: null
  },
  mutations: {
    setPoems(state, { data }) {
      state.fetchedPoems = data;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    fetchPoems({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/linecount/6")
          .then(({ data }) => {
            commit("setPoems", data);
            resolve(data);
          })
          .catch(error => {
            commit("setError", error);
            reject(error);
          });
      });
    }
  }
});
