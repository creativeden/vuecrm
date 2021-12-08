import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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
const database = ref(getDatabase(app));

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await get(child(database, `users/${uid}/info`)) ).val()
                commit('setInfo', info)
            } catch (e) {

            }
        }
    },
    getters: {
        info: s => s.info
    }
}