// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration object with your project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCQqfsO37wnTS7TtNPWmOW_BloQ3mdBHhY",
  authDomain: "flying-penguins-7a390.firebaseapp.com",
  projectId: "flying-penguins-7a390",
  storageBucket: "flying-penguins-7a390.firebasestorage.app",
  messagingSenderId: "994030913801",
  appId: "1:994030913801:web:4893f219d25feaa1792bd8",
  measurementId: "G-HV7JTKDX7Y"
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);
// Get Auth instance for authentication operations
const auth = getAuth(app);

export { auth };