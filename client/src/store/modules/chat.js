export default {
  state: {
    user: {},
    messages: [],
    users: [],
    typingUsers: []
  },
  getters: {
    user: state =>  state.user,
    messages: state => state.messages,
    users: state => state.users,
    typingUsers: state => state.typingUsers
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    exitRoom(state) {
      state.user = {},
      state.messages = [],
      state.users = []
    },
    SOCKET_newMessage(state, message) {
      state.messages.push(message)
    },
    SOCKET_updateUsers(state, users) {
      state.users = users
    },
    SOCKET_addTypingUsers(state, user) {
      if(!state.typingUsers.find(u => u.id === user.id)) {
        state.typingUsers.push(user)
      }
    },
    SOCKET_deleteTypingUser(state, user) {
      state.typingUsers = state.typingUsers.filter(u => u.id != user.id)
    }
  },
  actions: {
  }
};
