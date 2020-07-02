<template>
    <q-list bordered>
        <q-item v-for="u in users" :key="u.id" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                    {{ u.letter }}
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ u.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-icon name="chat_bubble" :color="u.id === user.id ? 'green' : 'grey'" />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: mapGetters(['users', 'user'])
}
</script>

<style>

</style>