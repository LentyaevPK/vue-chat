<template>
    <div>
        <div v-if="name === 'admin'">
            <p class="text-center">{{text}}</p>
            <hr>
        </div>
        <div v-else>
            <q-chat-message
                :name="name"
                :text="[text]"
                :sent="owner"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        text: String,
        owner: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>