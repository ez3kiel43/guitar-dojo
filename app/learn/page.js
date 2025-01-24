'use client';
import ChordTemplate from '@/components/chord_template';
import { useChords } from '@/context/chords_context';
import { useState } from 'react';

export default function LearnChords({}) {
	const { chords, loaded } = useChords();
	const [currentChord, setCurrentChord] = useState(6);
	// console.log(chords);

	return (
		<main className="w-full mx-auto py-12 overflow-hidden relative">
			{loaded ? (
				<>
					<article className="opacity-60 absolute w-2/5 top-40 -left-20">
						<ChordTemplate
							chordData={chords[currentChord - 1]}
						/>
					</article>
					<article className="w-8/12 mx-auto">
						<ChordTemplate chordData={chords[currentChord]} />
					</article>
					<article className="opacity-60 absolute w-2/5 top-40 -right-20">
						<ChordTemplate
							chordData={chords[currentChord + 1]}
						/>
					</article>
				</>
			) : (
				''
			)}
		</main>
	);
}
