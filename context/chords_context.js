'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
	collection,
	getDocs,
	orderBy,
	query,
	getDoc,
	doc,
} from 'firebase/firestore';
import { db } from '../lib/firebaseconfig.js';
import { auth } from '../lib/firebaseconfig.js';

const userInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
	const user = auth.currentUser;
	const [info, setInfo] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (user !== null) {
			const id = user.uid;
			const fetchInfo = async () => {
				const GeneralChordQ = query(
					collection(db, 'chords-general'),
					orderBy('cName')
				);
				const customChordQ = query(
					collection(db, 'users', id, 'chords-custom')
				);
				const userInfoQ = doc(db, 'users', id);

				try {
					const querySnapshot = await getDocs(GeneralChordQ);
					const userQuerySnapshot = await getDoc(userInfoQ);
					const customChordSnapshot = await getDocs(
						customChordQ
					);
					const userData = {
						a: [],
						b: [],
						c: [],
						d: [],
						e: [],
						f: [],
						g: [],
						custom: [],
						email: '',
						fName: '',
						lName: '',
						uName: '',
					};

					querySnapshot.forEach(doc => {
						// console.log(doc.data().cName.split('')[0]);
						userData[
							doc.data().cName.split('')[0].toLowerCase()
						].push({
							id: doc.id,
							...doc.data(),
						});
					});

					// console.log(userQuerySnapshot.data());
					customChordSnapshot.forEach(doc => {
						userData.custom.push({
							id: doc.id,
							...doc.data(),
						});
					});

					userData.email = userQuerySnapshot.data().email;
					userData.fName = userQuerySnapshot.data().name_first;
					userData.lName = userQuerySnapshot.data().name_last;
					userData.uName = userQuerySnapshot.data().uasername;

					setInfo(userData);
				} catch (error) {
					console.error('Error fetching chords:', error);
				} finally {
					setLoaded(true);
				}
			};

			fetchInfo();
		}
	}, []);

	return (
		<userInfoContext.Provider value={{ info, loaded }}>
			{children}
		</userInfoContext.Provider>
	);
};

export const useInfo = () => useContext(userInfoContext);
