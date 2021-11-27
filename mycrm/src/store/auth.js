import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                throw e
            }
        }
    }
}
