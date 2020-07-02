<template>
  <div class="q-pa-md" style="max-width: 400px; margin: 30px auto">

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Ваше имя *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Введите имя']"
      />

      <q-input
        filled
        v-model="room"
        label="Имя комнаты *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Введите название комнаты'
        ]"
      />

      <div>
        <q-btn label="Войти" type="submit" color="primary"/>
        <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    data () {
        return {
            name: null,
            room: null
        }
    },
    methods: {
        onSubmit () {
            const user = {
                name: this.name,
                room: this.room,
                letter: this.name[0].toUpperCase()
            }

            this.$socket.emit('userJoined', user, data => {
              if(typeof data === 'string') {
                console.error(data)
              } else {
                user.id = data.userId
                this.setUser(user)
                this.$router.push('/chat')
              }
            })
        },
        onReset () {
            this.name = null
            this.age = null
        },
        ...mapMutations(['setUser'])
    }
}
</script>

<style>

</style>