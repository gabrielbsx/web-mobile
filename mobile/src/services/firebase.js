import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  setLogLevel,
} from 'firebase/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import {getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAO94rUeqLlJFAqGLjHKL1YH66nKZIfEv8',
  authDomain: 'health-b778f.firebaseapp.com',
  projectId: 'health-b778f',
  storageBucket: 'health-b778f.appspot.com',
  messagingSenderId: '580812422008',
  appId: '1:580812422008:web:2d259fb2bd5b9564bee68d',
  measurementId: 'G-MP2C7X9YC4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage(app);

export {app, auth, db, storage};

//setLogLevel('debug');
