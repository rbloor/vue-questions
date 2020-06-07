import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    responses: [],
    user: null
  },
  mutations: {
    init(state) {
      if (localStorage.getItem("questions")) {
        state.questions = JSON.parse(localStorage.getItem("questions"))
      }
      if (localStorage.getItem("responses")) {
        state.responses = JSON.parse(localStorage.getItem("responses"))
      }
      if (localStorage.getItem("user")) {
        state.user = JSON.parse(localStorage.getItem("user"))
      }
    },
    setQuestions(state, questions) {
      localStorage.setItem("questions", JSON.stringify(questions))
      return (state.questions = questions)
    },
    removeQuestions(state) {
      state.questions = []
      localStorage.removeItem("questions")
    },
    setResponses(state, responses) {
      localStorage.setItem("responses", JSON.stringify(responses))
      return (state.responses = responses)
    },
    removeResponses(state) {
      state.responses = []
      localStorage.removeItem("responses")
    },
    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify(user))
      return (state.user = user)
    },
    removeUser(state) {
      state.user = []
      localStorage.removeItem("user")
    }
  },
  getters: {
    questions: (state) => {
      return state.questions
    },
    responses: (state) => {
      return state.responses
    },
    user: (state) => {
      return state.user
    }
  },
  actions: {
    setQuestions(context, questions) {
      context.commit("setQuestions", questions)
    },
    removeQuestions(context) {
      context.commit("removeQuestions")
    },
    setResponses(context, response) {
      context.commit("setResponses", response)
    },
    removeResponses(context) {
      context.commit("removeResponses")
    },
    login(context, user) {
      context.commit("setUser", user)
    },
    logout(context) {
      context.commit("removeUser")
    }
  }
})
