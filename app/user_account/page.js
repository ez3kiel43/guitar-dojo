'use client';
import ChordTemplate from '@/components/chord_template';
import SelectionMenu from '@/components/chord_selection';
import { useChords } from '@/context/chords_context';
import { useState, useEffect } from 'react';

export default function LearnChords({}) {
	const { chords, loaded } = useChords();
	const [currentChord, setCurrentChord] = useState(0);
	// console.log(chords);

	const changeChord = e => {
		let index = chords.findIndex(c => {
			return e.target.textContent == c.cName;
		});
		setCurrentChord(index);
	};

	return (
		<main className="w-full mx-auto py-12 overflow-hidden ">
			{loaded ? (
				<section>
					<article className="w-3/5 mx-auto">
						<ChordTemplate
							chordData={chords[currentChord]}
							clickFn={null}
						/>
						<h2 className="font-serif text-navy text-3xl mx-auto my-2 text-center">
							{chords[currentChord].cName}
						</h2>
					</article>
					<article className="w-10/12 mx-auto py-4">
						<SelectionMenu
							data={chords}
							boxClickFn={changeChord}
						/>
					</article>
				</section>
			) : (
				''
			)}
		</main>
	);
}
