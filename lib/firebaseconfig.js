// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBjVVzWh6LpbYIBM0El4T8WBFTxLXwBuyc',
	authDomain: 'guitar-dojo-7596e.firebaseapp.com',
	projectId: 'guitar-dojo-7596e',
	storageBucket: 'guitar-dojo-7596e.firebasestorage.app',
	messagingSenderId: '206023725889',
	appId: '1:206023725889:web:2771dbae4fdcbd47c647c0',
	measurementId: 'G-REBHH2NFMY',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
