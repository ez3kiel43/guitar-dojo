'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebaseconfig.js';

const ChordsContext = createContext();

export const ChordsProvider = ({ children }) => {
	const [chords, setChords] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchChords = async () => {
			const q = query(
				collection(db, 'chords-general'),
				orderBy('cName')
			);

			try {
				const querySnapshot = await getDocs(q);
				const chordsData = [];

				querySnapshot.forEach(doc => {
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
	}, []);

	return (
		<ChordsContext.Provider value={{ chords, loaded }}>
			{children}
		</ChordsContext.Provider>
	);
};

export const useChords = () => useContext(ChordsContext);
