<template>
    <section>
        <input 
            class="search" 
            v-model="inputValue" 
            type="text" 
            placeholder="Найти"
            @keydown.enter="find()"
        >
        <button @click="find()">
            Поиск
        </button>
    </section>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { useHomeStore } from '../store/HomeStore'
    const store = useHomeStore()

    const inputValue = ref<string>('')

    const find = () => {
        store.search = inputValue.value
    }
</script>

<style scoped>
    section {
        display: flex;
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
    }

    .search {
        flex: 1;
    }
</style>