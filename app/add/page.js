'use client';

import ChordTemplate from '@/components/ChordTemplate';
import SaveChord from '@/components/SaveChord';
import { useState } from 'react';

export default function AddChords() {
	const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0]);

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
		let newStrings = strings;
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
		setStrings([...newStrings]);
	};

	return (
		<main className="w-9/12 mx-auto md:flex">
			<section className="my-4">
				<ChordTemplate clickFn={handleClick} chordData={strings} />
			</section>
			<SaveChord stringsData={strings} />
		</main>
	);
}
