'use client';
import Image from 'next/image';
import ChordTemplate from '@/components/chord_template';
import SelectionMenu from '@/components/chord_selection';
import Header from '@/components/header';
import { useState } from 'react';
import Info from '@/lib/chords.json';
import Menu from '@/components/menu';

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
		setCurrentChord(0);
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
			<Header></Header>
			<main className="w-full mx-auto py-12 overflow-hidden ">
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
							changeFn={changeFamily}
							boxClickFn={changeChord}
						/>
					</article>
				</section>
			</main>
			<footer className="bg-navy h-28 fixed bottom-0 w-screen">
				<Image
					src="/guitar_dojo_logo.png"
					width={175}
					height={100}
					alt="Guitar Dojo Logo"
				></Image>
				<Menu />
			</footer>
		</>
	);
}
