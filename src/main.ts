import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

// Regeln definieren
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

configure({
  validateOnInput: true
})

const app = createApp(App)
const store = createPinia()

app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.use(store)
app.use(router)
app.mount('#app')
