import './types'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('HomeStore', () => {

    const mdlContactForm = ref<boolean>(false)
    const idEdit = ref<number | null>(null)
    const contacts = ref<Contact[]>([])
    const search = ref<string>('')
    const username = ref<string>('')
    const email = ref<string>('')
    const phone = ref<string>('')

    const contactError = ref<Contact>({
        id: 0,
        username: '',
        email: '',
        phone: ''
    })

    const getContactById = (idContact: number) => {
        console.log(idContact)
        return contacts.value.filter(contact => contact.id === idContact)
    }

    const getSearchContact = () => {
        return contacts.value.filter((contact: Contact) => 
            contact.username.toLowerCase().includes(search.value.toLowerCase().trim())
        )
    } 

    const openModal = (valContact?: Contact) => {      
        if (valContact) {
            idEdit.value = valContact.id
            username.value = valContact.username
            email.value = valContact.email
            phone.value = valContact.phone
        } else {
            idEdit.value = null
            clearContacts()
        }
        mdlContactForm.value = !mdlContactForm.value
    }

    const getContacts = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()

        const array: Contact[] = []
        result.forEach((user: User, i: number) => {
            array.push({
                id: i+1,
                username: user.name,
                email: user.email,
                phone: user.phone
            })
        })

        if (!localStorage.getItem('contacts') || 
            localStorage.getItem('contacts') === '[]') {
            localStorage.setItem('contacts', JSON.stringify(array))
        }

        updateContacts()
    }

    const deleteContact = (idContact: number) => {
        deleteStorageContacts(idContact)
    }

    const clearContacts = () => {
        username.value = ''
        email.value = ''
        phone.value = ''
        contactError.value = {
            id: 0,
            username: '',
            email: '',
            phone: ''
        }
    }

    const isEmail = (email: string) => {
        return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
    } 

    const validation = () => {
        if (username.value !== '') {
            contactError.value.username = ''
        } else {
            contactError.value.username = 'Заполните поле имя'
        }

        if (isEmail(email.value)) {
            contactError.value.email = ''
        } else {
            contactError.value.email = 'Некорректный email'
        }

        if (phone.value !== '') {
            contactError.value.phone = ''
        } else {
            contactError.value.phone = 'Заполните поле телефон'
        }

        return (
            isEmail(email.value) &&
            username.value !== '' &&
            phone.value !== ''
        )
    }

    const addStorageContact = (contact: Contact) => {
        if (localStorage.getItem('contacts')) {
            const contacts = getStorageContacts()
            contacts.push(contact)
            setStorageContacts(contacts)
        } else {
            setStorageContacts([contact])
        }
        updateContacts()
    }

    const deleteStorageContacts = (idContact: number) => {
        let contacts = getStorageContacts()
        contacts = contacts.filter((contact: Contact) => contact.id !== idContact)
        setStorageContacts(contacts)
        updateContacts()
    }

    const editStorageContacts = (valContact: Contact) => {
        let contacts = getStorageContacts()
        contacts = contacts.map((item: Contact) => {
            if (item.id === idEdit.value) {
                return {
                    id: item.id,
                    username: valContact.username,
                    email: valContact.email,
                    phone: valContact.phone
                }
            } else {
                return item
            }
        })

        setStorageContacts(contacts)
        updateContacts()
    }

    const getStorageContacts = () => {
        return JSON.parse(String(localStorage.getItem('contacts')))
    }

    const setStorageContacts = (contact: Contact[]) => {
        localStorage.setItem('contacts', JSON.stringify(contact))
    }

    const updateContacts = () => {
        contacts.value = getStorageContacts()
    }

    const addContact = (contact: Contact) => {
        if (validation()) {
            addStorageContact(contact)
            openModal()
        }
    }

    const editContact = (contact: Contact) => {
        if (validation()) {
            editStorageContacts(contact)
            openModal()
        }
    }

    return { 
        contacts, 
        getContactById,
        openModal,
        mdlContactForm,
        getContacts,
        addContact,
        contactError,
        deleteContact,
        idEdit,
        editContact,
        search,
        getSearchContact,
        updateContacts,
        username,
        email,
        phone
    }
})