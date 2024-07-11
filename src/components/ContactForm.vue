<template>
    <section>
        <form class="contact_form" @submit.prevent>
            <div class="header">
                <span class="title" v-if="store.idEdit">Изменить контакт:</span>
                <span class="title" v-else>Создать контакт:</span>
                <button @click="store.openModal()">✖</button>
            </div>

            <div class="body">
                <span class="error">{{ store.contactError.username }}</span>
                <input v-model="store.username" type="text" placeholder="Имя">

                <span class="error">{{ store.contactError.email }}</span>
                <input v-model="store.email" type="text" placeholder="Email">

                <span class="error">{{ store.contactError.phone }}</span>
                <input v-model="store.phone" type="text" placeholder="Телефон">

                <button 
                    v-if="store.idEdit" 
                    @click="store.editContact({
                        id: 0,
                        username: store.username,
                        email: store.email,
                        phone: store.phone
                    })"
                >
                    Изменить
                </button>

                <button 
                    v-else
                    @click="store.addContact({
                        id: Date.now(),
                        username: store.username,
                        email: store.email,
                        phone: store.phone
                    })"
                >
                    Создать
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>
    import { useHomeStore } from '../store/HomeStore'
    const store = useHomeStore()
</script>

<style scoped>
    section {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
    }

    .contact_form {
        margin: auto;
        background: white;
        border-radius: 3px;
        min-height: 50px;
        min-width: 300px;
        padding: 10px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .title {
        font-weight: bold;
    }

    .body {
        display: flex;
        flex-direction: column;
    }

    .error {
        color: red;
        font-weight: bold;
    }
</style>