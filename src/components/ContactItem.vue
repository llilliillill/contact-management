<template>
    <li class="contact">
        <div class="text">
            <span class="title"><b>Имя:</b> {{ contact.username }}</span>
            <span class="title"><b>Email:</b> {{ contact.email }}</span>
            <span class="title"><b>Телефон:</b> {{ contact.phone }}</span>
        </div>
        <button @click="edit(contact)">✎</button>
        <button @click="clear(contact.id)">✖</button>
    </li>
</template>

<script lang="ts" setup>
    import { withDefaults, defineProps } from 'vue'

    interface Contact {
        id: number,
        username: string,
        email: string,
        phone: string
    }

    withDefaults(
        defineProps<{
            contact: Contact,
            clear?: (idContact: number) => void,
            edit?: (contact: Contact) => void
        }>(), {
            clear: () => false,
            edit: () => false
        }
    )
</script>

<style scoped>
    .contact {
        list-style-type: none;
        box-shadow: 0px 0px 5px 0px rgba(128, 128, 128, 0.75);
        border: none;
        border-radius: 3px;
        display: flex;
        padding: 5px;
        margin-bottom: 10px;
        align-items: center;
    }

    .text {
        display: flex;
        flex: 1;
    }

    .title {
        flex: 1;
    }
</style>