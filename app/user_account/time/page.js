'use client';
import SelectionMenu from '@/components/chord_selection';
import ChordBox from '@/components/chord_box';
import { useChords } from '@/context/chords_context';
import { useState } from 'react';

import Link from 'next/link';

export default function TimeTrial() {
	const { chords, loaded } = useChords();
	const [list, setList] = useState([]);
	const addToList = e => {
		let index = chords.findIndex(c => {
			return e.target.textContent == c.cName;
		});
		setList([...list, chords[index]]);
	};

	return (
		<main className="w-10/12 mx-auto py-12 overflow-hidden relative">
			{loaded ? (
				<SelectionMenu data={chords} boxClickFn={addToList} />
			) : (
				''
			)}

			<article className="h-36">
				<h2 className="font-serif text-left text-navy text-xl w-full px-2">
					Current Selection:
				</h2>
				<div className="flex overflow-scroll">
					{list.map((chord, i) => {
						console.log(chord);
						return (
							<ChordBox
								chordName={chord.cName}
								clickFn={null}
								key={`${chord.cName}_${i}_selection`}
							/>
						);
					})}
				</div>
			</article>

			<section className="font-serif text-navy text-xl flex flex-col">
				<label htmlFor="ordered" className="relative">
					<span className="border-navy border-4 w-5 h-5 rounded-full my-1 absolute"></span>
					<p className="relative left-8">Ordered</p>
					<input
						type="radio"
						name="order-select"
						id="ordered"
						value={0}
						className=""
					/>
				</label>
				<label htmlFor="randomized">
					<span className="border-navy border-4 w-5 h-5 rounded-full my-1 absolute "></span>
					<p className="relative left-8">Randomized</p>
					<input
						type="radio"
						name="order-select"
						id="randomized"
						value={1}
						className=""
					/>
				</label>

				<label htmlFor="interval">Time Interval:</label>
				<select
					name="interval"
					id="interval"
					className="bg-sand text-navy w-2/5 h-8 my-2 font-serif text-lg"
				>
					<option>5s</option>
					<option>4s</option>
					<option>3s</option>
					<option>2s</option>
					<option>1s</option>
					<option>0.5s</option>
					<option>0.25s</option>
					<option>0.1s</option>
				</select>
			</section>

			<Link href={'time/play'}>
				<button className="font-serif text-navy border-navy border-4 bg-sand text-xl rounded-md h-10 w-2/5">
					Go!
				</button>
			</Link>
			<button
				className="font-serif text-rose-800 border-rose-800 border-4 bg-white text-xl rounded-md h-10 w-2/5 ml-12"
				onClick={() => {
					setList([]);
				}}
			>
				Clear
			</button>
		</main>
	);
}
