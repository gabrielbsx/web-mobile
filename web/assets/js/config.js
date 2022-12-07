import { initializeApp }  from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth }  from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAO94rUeqLlJFAqGLjHKL1YH66nKZIfEv8",
  authDomain: "health-b778f.firebaseapp.com",
  projectId: "health-b778f",
  storageBucket: "health-b778f.appspot.com",
  messagingSenderId: "580812422008",
  appId: "1:580812422008:web:2d259fb2bd5b9564bee68d",
  measurementId: "G-MP2C7X9YC4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);