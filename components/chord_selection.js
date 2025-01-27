'use client';

import { useState } from 'react';
import ChordBox from './chord_box';

export default function SelectionMenu({ data, boxClickFn }) {
	const [family, setFamily] = useState('A');

	return (
		<section className="h-56">
			<label
				htmlFor="chord-selection"
				className="font-serif text-navy text-xl block mx-2"
			>
				Chord Family:
			</label>
			<select
				id="chord-selection"
				name="chord-selection"
				className="bg-sand text-navy w-2/5 h-8 m-2 font-serif text-lg"
				onChange={e => {
					setFamily(e.target.value);
				}}
			>
				<option value={'A'}>A</option>
				<option value={'B'}>B</option>
				<option value={'C'}>C</option>
				<option value={'D'}>D</option>
				<option value={'E'}>E</option>
				<option value={'F'}>F</option>
				<option value={'G'}>G</option>
				<option value={'custom'}>Custom</option>
			</select>
			<article className="flex justify-start flex-wrap">
				{data.map((chord, i) => {
					if (chord.cName[0] === family) {
						return (
							<ChordBox
								chordName={chord.cName}
								clickFn={boxClickFn}
								key={`${chord.cName}_${i}`}
							/>
						);
					}
				})}
			</article>
		</section>
	);
}
