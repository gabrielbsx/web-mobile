import {initializeApp} from 'firebase/app';
import {initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
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

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
  experimentalForceLongPolling: true,
});
export const db = getFirestore(app);
