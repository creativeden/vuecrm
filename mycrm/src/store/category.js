import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, child, update, onValue } from "firebase/database";

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
        async fetchCategories({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid')

                // const dbRef = ref(getDatabase())
                
                // const categories = await get(child(dbRef, `users/${uid}/categories`)).then((snapshot) => {
                //     if (snapshot.exists()) {
                //         console.log(snapshot.val())
                //         console.log(categories)
                //     } else {
                //         console.log("No data available")
                //     }
                // })

                const categories = ref(database, `users/${uid}/categories`)
                onValue(categories, (snapshot) => {
                    const data = snapshot.val()
                    // console.log(snapshot.val())
                    // return data
                    // updateStarCount(postElement, data)
                    const cats = []
                    Object.keys(categories).forEach(key => {
                        cats.push({
                            title: categories[key].title,
                            limit: categories[key].limit,
                            id: key
                        })
                    })
                    console.log(data)
                    return data
                })

                // console.log(Object.keys(categories))

                
                
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({ dispatch, commit }, { title, limit }) {
            try {
                const uid = await dispatch('getUid')
                const postData = { title, limit }
                const newPostKey = push(child(ref(database), 'users')).key
                const updates = {}
                updates['/users/' + uid + '/categories/' + newPostKey] = postData
                return update(ref(database), updates)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}