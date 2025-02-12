'use client';

import ChordTemplate from '@/components/chord_template';
import { useState } from 'react';

export default function AddChords() {
	const [chord, setChord] = useState({
		cName: '',
		strings: [0, 0, 0, 0, 0, 0],
		fret: 0,
	});

	const getClickPos = e => {
		const templateSize = {};
		templateSize.top = e.target
			.closest('svg')
			.getBoundingClientRect().top;
		templateSize.left = e.target
			.closest('svg')
			.getBoundingClientRect().left;
		templateSize.right = e.target
			.closest('svg')
			.getBoundingClientRect().right;
		templateSize.bottom = e.target
			.closest('svg')
			.getBoundingClientRect().bottom;
		let click = {
			x: e.clientX,
			y: e.clientY,
		};
		let ratioX = (templateSize.right - templateSize.left) / 240;
		let ratioY = (templateSize.bottom - templateSize.top) / 360;
		// console.log(templateSize);
		// console.log(click);
		let string = Math.floor((click.x - templateSize.left) / ratioX / 40);

		let fret = Math.round((click.y - templateSize.top) / ratioY / 60);
		return { x: string, y: fret };
	};

	const handleClick = e => {
		let coords = getClickPos(e);
		console.log(coords);
		let newStrings = chord.strings;
		// console.log(newStrings);

		if (coords.y == 0) {
			if (newStrings[coords.x] == 0) {
				newStrings[coords.x] = -1;
			} else {
				newStrings[coords.x] = 0;
			}
		} else {
			newStrings[coords.x] = coords.y;
		}
		setChord({
			...coords,
			strings: [...newStrings],
		});
	};

	return (
		<main className="w-9/12 mx-auto">
			<label
				htmlFor="chord_name"
				className="block w-9/12 mt-2 text-navy"
			>
				Chord Name:
			</label>
			<input
				id="chord_name"
				name="chord_name"
				className="my-3 border-navy border-2 rounded-md w-6/12"
				onChange={e => {
					setChord({ ...chord, cName: e.target.value });
				}}
			/>
			<ChordTemplate clickFn={handleClick} chordData={chord} />
		</main>
	);
}
