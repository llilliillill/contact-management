<template>
    <section>
        <div class="header">
            <h3 class="title">
                Список контактов:
            </h3>

            <button 
                title="Добавить контакт"
                @click="add()"
            >
                + Добавить
            </button>
        </div>

        <ul class="contact_list" v-if="store.contacts.length">
            <transition-group name="list">
                <ContactItem
                    v-for="contact in store.getSearchContact()" :key="contact.id"
                    :contact="contact"
                    :clear="store.deleteContact"
                    :edit="store.openModal"
                />
            </transition-group>
        </ul>

        <div class="empty" v-else>
            Нет контактов
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue'
    import ContactItem from '../components/ContactItem.vue'

    import { useHomeStore } from '../store/HomeStore'
    const store = useHomeStore()

    interface Contact {
        id: number,
        username: string,
        email: string,
        phone: string
    }

    defineProps<{
        contacts: Contact[],
        add: () => void
    }>()
</script>

<style scoped>
    section {
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
    }

    .contact_list {
        padding: 5px;
        margin-top: 5px;
    }

    .header {
        padding-left: 8px;
        display: flex;
        align-items: center;
    }

    .title {
        flex: 1;
    }

    .empty {
        text-align: center;
        font-weight: bold;
    }

    /* Анимация */
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    
    .list-enter-active,
    .list-leave-active {
        transition: all 1s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>