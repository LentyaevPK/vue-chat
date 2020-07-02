<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%">
      <Message
        v-for="(msg, index) in messages"
        :key="index"
        :name="msg.name"
        :text="msg.text"
        :owner="msg.id === user.id"
      />
      <q-chat-message
        v-for="m in typingUsers"
        :key="m.id"
        :name="m.name"
        :sent="false"
      >
        <q-spinner-dots size="2rem" />
      </q-chat-message>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Message from './Message'

export default {
    components: {
        Message
    },
    computed: {
        ...mapGetters(['messages', 'user', 'typingUsers'])
    }
}
</script>

<style>

</style>