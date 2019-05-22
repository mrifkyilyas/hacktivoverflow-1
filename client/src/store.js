import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";
import router from "./router";
import axios from "@/api/axios";

Vue.use(Vuex);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000
});
export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    allQuestions: [],
    email:''
  },
  mutations: {
    setUserStatus(state, payload) {
      state.isLogin = payload.status
      state.name = payload.name,
      state.email = localStorage.email

    },
    postGetAllQuestions(state, payload) {
      state.allQuestions = payload.data.reverse()
    }
  },
  actions: {
    logout({ commit }) {
      localStorage.clear()
      commit("setUserStatus", {
        status: false,
      })
    },
    notif({ commit }, { type, message }) {
      Toast.fire({
        type: type,
        text: message
      });
    },
    getAllQuestions({ commit }) {
      axios
        .get('/question')
        .then(({ data }) => {
          console.log(data, 'masuk actions')
          commit("postGetAllQuestions", {
            data
          })

        })
        .catch(err => {
          console.log(err)
        })
    },



  }
});
