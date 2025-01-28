'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebaseconfig.js';
import { auth } from '../lib/firebaseconfig.js';

const ChordsContext = createContext();

export const ChordsProvider = ({ children }) => {
	const user = auth.currentUser;
	const [chords, setChords] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (user !== null) {
			const id = user.uid;
			const fetchChords = async () => {
				const GeneralChordQ = query(
					collection(db, 'chords-general'),
					orderBy('cName')
				);
				const customChordQ = query(
					db,
					'users',
					uid,
					'chords-custom'
				);

				try {
					const querySnapshot = await getDocs(GeneralChordQ);
					const customQuerySnapshot = await getDocs(
						customChordQ
					);
					const chordsData = [];

					querySnapshot.forEach(doc => {
						chordsData.push({ id: doc.id, ...doc.data() });
					});

					customQuerySnapshot.forEach(doc => {
						chordsData.push({ id: doc.id, ...doc.data() });
					});

					setChords(chordsData);
				} catch (error) {
					console.error('Error fetching chords:', error);
				} finally {
					setLoaded(true);
				}
			};

			fetchChords();
		}
	}, []);

	return (
		<ChordsContext.Provider value={{ chords, loaded }}>
			{children}
		</ChordsContext.Provider>
	);
};

export const useChords = () => useContext(ChordsContext);
