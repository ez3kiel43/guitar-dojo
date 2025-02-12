'use client';

import ChordBox from './chord_box';

export default function SelectionMenu({ data, changeFn, boxClickFn }) {
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
					changeFn(e.target.value);
				}}
			>
				<option value={'a'}>A</option>
				<option value={'b'}>B</option>
				<option value={'c'}>C</option>
				<option value={'d'}>D</option>
				<option value={'e'}>E</option>
				<option value={'f'}>F</option>
				<option value={'g'}>G</option>
				<option value={'custom'}>Custom</option>
			</select>
			<article className="flex justify-start flex-wrap">
				{data.map((chord, i) => {
					return (
						<ChordBox
							chordName={chord.cName}
							clickFn={boxClickFn}
							key={`${chord.cName}_${i}`}
						/>
					);
				})}
			</article>
		</section>
	);
}
