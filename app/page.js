'use client';
import ChordTemplate from '@/components/ChordTemplate';
import SelectionMenu from '@/components/ChordSelection';

import { useState } from 'react';
import Info from '@/lib/chords.json';

export default function LearnChords() {
	const [chords, setChords] = useState([
		{ cName: 'A', strings: [-1, 0, 2, 2, 2, 0], fret: 0 },
		{ cName: 'Am', strings: [-1, 0, 2, 2, 1, 0], fret: 0 },
		{ cName: 'Asus', strings: [-1, 0, 2, 2, 3, 0], fret: 0 },
	]);
	const [currentChord, setCurrentChord] = useState(0);

	const changeChord = e => {
		let index = chords.findIndex(c => {
			return e.target.textContent == c.cName;
		});
		setCurrentChord(index);
	};

	const changeFamily = letter => {
		let tempArr = [];

		Info.map(c => {
			if (c.cName[0] === letter.toUpperCase()) {
				tempArr.push(c);
			}
		});

		setChords(tempArr);
	};

	return (
		<>
			<main className="w-full mx-auto py-12 overflow-hidden max-w-sm md:max-w-full">
				<section className="md:flex md:w-full">
					<article className="w-3/5 mx-auto ">
						<ChordTemplate
							chordData={chords[currentChord].strings}
							clickFn={null}
						/>
						<h2 className="font-serif text-navy text-3xl mx-auto my-2 text-center">
							{chords[currentChord].cName}
						</h2>
					</article>
					<article className="w-10/12 mx-auto py-4">
						<SelectionMenu
							data={chords}
							changeFn={changeFamily}
							boxClickFn={changeChord}
						/>
					</article>
				</section>
			</main>
		</>
	);
}
