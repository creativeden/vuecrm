import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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
const database = getDatabase(app);

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

                // const info = await ref(database, 'users/' + uid + '/info')
                
                // onValue(info, (snapshot) => {
                //     const data = snapshot.val();
                //     // updateStarCount(postElement, data);
                // })

                const info = (await set(ref(database, 'users/' + uid + '/info')).once('value')).val()
                
                commit('setInfo', info)
            } catch (e) {

            }
        }
    },
    getters: {
        info: $ => $.info
    }
}