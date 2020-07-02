<template>
  <q-layout view="lhh LpR lff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-btn dense flat round icon="arrow_back" @click="leaveRoom"/>
        <q-toolbar-title>
          Чат комнаты {{user.room}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Сейчас в комнате</q-toolbar-title>
      </q-toolbar>

      <UserList />
    </q-drawer>

    <q-page-container ref="chat">
      <Chat />
    </q-page-container>

    <q-footer elevated class="bg-white text-white">
      <q-input
        outlined
        v-model="text"
        label="Введите сообщение"
        @keydown.enter="sendMsg"
        @focusin="showTypingUser"
        @focusout="removeTypingUser"
      />
    </q-footer>

  </q-layout>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import UserList from './UserList'
import Chat from './Chat'

export default {
  components: {
    UserList, Chat
  },
  data () {
      return {
        left: false,
        text: ''
      }
  },
  mounted() {
    document.title = `Комната ${this.user.room}`
  },
  beforeDestroy() {
    document.title = 'Добро пожаловать в чат'
  },
  computed: mapGetters(['user', 'messages']),
  watch: {
    messages() {
      setTimeout(() => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight
      }, 0)
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
          if(!Object.keys(vm.user).length) {
              next('/?message=noUser')
          }
      })
  },
  methods: {
      leaveRoom() {
        this.$socket.emit('userLeft', this.user.id, () => {
          this.$router.push('/?message=leftChat')
          this.exitRoom()
        })
      },
      sendMsg() {
        let msg = {
          text: this.text.trim(),
          id: this.user.id
        }

        this.$socket.emit('createMsg', msg, data => {
          if(typeof data === 'string') {
            console.error(data)
          } else {
            this.text = ''
          }
          this.removeTypingUser()
        })
      },
      showTypingUser() {
        this.$socket.emit('showTypingUser', this.user)
      },
      removeTypingUser() {
        this.$socket.emit('removeTypingUser', this.user)
      },
      ...mapMutations(['exitRoom'])
  }
}
</script>

<style>

</style>