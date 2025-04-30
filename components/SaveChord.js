'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import supabase from '@/lib/supabase';

export default function SaveChord({ stringsData }) {
	const { session, loading } = useAuth();
	const [message, setMessage] = useState('');
	const [cName, setCName] = useState('');
	const [fretNum, setFretNum] = useState(0);

	const handleSubmit = async e => {
		if (!session) {
			alert('must be logged in');
			return;
		}

		const user = session.user;

		const { error } = await supabase.from('chords').insert({
			user_id: user.id, // assuming you have this column in your `chords` table
			chord_name: cName,
			fret: fretNum,
			strings: stringsData,
		});

		if (error) {
			console.error('Insert error:', error.message);
			setMessage('Error saving chord.');
		} else {
			setMessage('Chord saved!');
			setCName('');
			setFretNum(0);
		}
		alert(message);
	};

	return (
		<form action={handleSubmit}>
			<label
				htmlFor="chord_name"
				className="block w-9/12 mt-2 text-navy"
			>
				Chord Name:
				<input
					type="text"
					name="chord_name"
					id="chord_name"
					className="my-3 border-navy border-2 rounded-md w-full"
					required
					onChange={e => {
						setCName(e.target.value);
					}}
				/>
			</label>
			<label
				htmlFor="fret_num"
				className="block w-9/12 mt-2 text-navy"
			>
				Fret:
				<input
					type="number"
					min={0}
					max={10}
					name="fret_num"
					id="fret_num"
					className="my-3 border-navy border-2 rounded-md w-1/4 mx-2"
					onChange={e => {
						setFretNum(Number(e.target.value));
					}}
				/>
			</label>
			<input
				type="submit"
				value={'Save Chord'}
				className="my-3 border-navy border-2 rounded-md text-navy p-2 font-serif bg-sand"
			/>
		</form>
	);
}
