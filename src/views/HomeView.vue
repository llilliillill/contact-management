<template>
  <section>
    <ContactForm 
      v-show="store.mdlContactForm"
    />

    <SearchBar />

    <ContactList 
      :contacts="store.contacts"
      :add="store.openModal"
    />
  </section>
</template>

<script lang="ts" setup>
  import SearchBar from '../components/SearchBar.vue'
  import ContactList from '../components/ContactList.vue'
  import ContactForm from '../components/ContactForm.vue'
  import { useHomeStore } from '../store/HomeStore'

  document.title = 'Управление контактами';
  const store = useHomeStore()
  store.getContacts()
</script>

<style scoped>

</style>
