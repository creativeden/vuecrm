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
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await push( child( ref(database, 'users/' + uid + '/categories'), {title, limit} ), {title, limit} ).key
                return {title, limit, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}