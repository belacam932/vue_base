import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ref, onUnmounted } from 'vue'
const firebaseConfig = {
  apiKey: "AIzaSyDXemz-7aVMgjRpTjvoY4TU2SHk8kJ-CI4",
  authDomain: "vuejs-269b9.firebaseapp.com",
  databaseURL: "https://vuejs-269b9-default-rtdb.firebaseio.com",
  projectId: "vuejs-269b9",
  storageBucket: "vuejs-269b9.appspot.com",
  messagingSenderId: "242367516926",
  appId: "1:242367516926:web:f6579b1df85ef8677515af",
  measurementId: "G-CRCXJBZZZ0"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}