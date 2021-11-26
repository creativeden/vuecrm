import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
console.log(app);

// import 'firebase/auth'
// import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: "AIzaSyBRRlYl1k2q8ycTU3Y3UdmIkWs4_hd3lcE",
  authDomain: "vue-dbcrm.firebaseapp.com",
  projectId: "vue-dbcrm",
  storageBucket: "vue-dbcrm.appspot.com",
  messagingSenderId: "594808315017",
  appId: "1:594808315017:web:a78db84c229940da1f3a58",
  measurementId: "G-YQQ777KMB4"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// app.auth().onAuthStateChanged(() => {
//   console.log('test')
// })

// initializeApp.auth().onAuthStateChanged(() => {
  
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
