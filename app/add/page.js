'use client';

import drawChord from '../modules/draw_chords';
import svgGroup from '@/components/svg_group';
import { useState } from 'react';

export default function AddChords() {
	const [coords, setCoords] = useState([]);

	const chord = {
		name: '',
		strings: [0, 0, 0, 0, 0, 0],
		fret: 0,
	};

	return (
		<main>
			<svg
				id="template"
				data-name="template"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 240 360"
				className="w-9/12 mx-auto"
				onClick={e => {
					const templateSize = {};
					templateSize.top =
						e.target.getBoundingClientRect().top;
					templateSize.left =
						e.target.getBoundingClientRect().left;
					let click = {
						x: e.clientX,
						y: e.clientY,
					};
					console.log(templateSize);
					let string = Math.floor(
						(click.x - templateSize.left) / 40
					);

					let fret = Math.floor(
						(click.y - templateSize.top) / 60
					);

					if (fret == 0) {
						if (chord.strings[string] == 0) {
							chord.strings[string] = -1;
						} else {
							chord.strings[string] = 0;
						}
					} else {
						chord.strings[string] = fret;
					}

					console.log(chord);
				}}
			>
				<line
					x1="20"
					y1="36"
					x2="224"
					y2="36"
					fill="none"
					stroke="#3b3561"
					strokeWidth="8"
				/>
				<line
					x1="20"
					y1="98"
					x2="224"
					y2="98"
					fill="none"
					stroke="#3b3561"
					strokeWidth="4"
				/>
				<line
					x1="20"
					y1="158"
					x2="224"
					y2="158"
					fill="none"
					stroke="#3b3561"
					strokeWidth="4"
				/>
				<line
					x1="20"
					y1="218"
					x2="224"
					y2="218"
					fill="none"
					stroke="#3b3561"
					strokeWidth="4"
				/>
				<line
					x1="20"
					y1="278"
					x2="224"
					y2="278"
					fill="none"
					stroke="#3b3561"
					strokeWidth="4"
				/>
				<line
					x1="20"
					y1="338"
					x2="224"
					y2="338"
					fill="none"
					stroke="#3b3561"
					strokeWidth="4"
				/>
				<line
					x1="182"
					y1="38"
					x2="182"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<line
					x1="222"
					y1="38"
					x2="222"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<line
					x1="102"
					y1="38"
					x2="102"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<line
					x1="62"
					y1="38"
					x2="62"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<line
					x1="22"
					y1="38"
					x2="22"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<line
					x1="142"
					y1="38"
					x2="142"
					y2="356"
					fill="none"
					stroke="#3b3561"
				/>
				<svgGroup code={coords.muted} type="muted" />
				<svgGroup code={coords.open} type="open" />
				<svgGroup code={coords.pressed} type="pressed" />
			</svg>
		</main>
	);
}
