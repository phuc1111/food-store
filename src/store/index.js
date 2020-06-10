import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ],
    count: 3
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
