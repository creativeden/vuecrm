import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth();
const database = getDatabase(app);

export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid')
                await set(ref(getDatabase(), 'users/' + uid + '/info'), {
                    bill: 100000,
                    name
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            await signOut(auth).then(() => {
                // Sign-out successful.
            })
        }
    }
}
