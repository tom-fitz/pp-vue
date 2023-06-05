import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
// import { initializeApp } from 'firebase/app';

// initializeApp(fbConfig)

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app')
