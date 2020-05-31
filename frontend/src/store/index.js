import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    responses: []
  },
  mutations: {
    init(state) {
      if (localStorage.getItem("questions")) {
        state.questions = JSON.parse(localStorage.getItem("questions"))
      }
      if (localStorage.getItem("responses")) {
        state.responses = JSON.parse(localStorage.getItem("responses"))
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
    }
  },
  getters: {
    questions: (state) => {
      return state.questions
    },
    responses: (state) => {
      return state.responses
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
    }
  }
})
