import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

interface IFirebaseCofnig{
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string,
}

const firebaseConfig:IFirebaseCofnig = {
  apiKey: "AIzaSyDMOXEQC6cxbDqYaCOHNr0U8jHCjG0IpJo",
  authDomain: "saransk-kabel.firebaseapp.com",
  projectId: "saransk-kabel",
  storageBucket: "saransk-kabel.appspot.com",
  messagingSenderId: "807994629093",
  appId: "1:807994629093:web:4e7e639979a5436ceb2d0c",
  measurementId: "G-QQ05MNWNVG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()