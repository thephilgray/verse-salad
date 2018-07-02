import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Chance from "chance";

const chance = new Chance();

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
    },
    setRandomIndex(state, payload) {
      state.randomIndex = payload;
    }
  },
  actions: {
    fetchPoems({ commit }) {
      axios
        .get("http://localhost:3000/linecount/6")
        .then(({ data }) => {
          const randomIndex = chance.integer({
            min: 0,
            max: data.data.length - 1
          });

          commit("setPoems", data);
          commit("setRandomIndex", randomIndex);
          return data;
        })
        .catch(error => {
          commit("setError", error);
        });
    }
  }
});
