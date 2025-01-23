'use client';

import Image from 'next/image';
import { useState } from 'react';
import NavBtn from './nav_btn';

const screens = [
	'Account',
	'Add A Chord',
	'Learn Chords',
	'Time Trial',
	'Write Songs',
];

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		// console.log('toggle');
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button className="absolute bottom-20 right-4 bg-sand rounded-full w-16 aspect-square">
				<Image
					src={isOpen ? `/open_btn.svg` : `close_btn.svg`}
					width={100}
					height={100}
					alt="toggle menu"
					className="w-1/2 mx-auto"
					onClick={toggleMenu}
				></Image>
			</button>
			<nav
				className={`absolute flex flex-col-reverse bg-transparent gap-4 font-serif text-xl right-4 bottom-40`}
			>
				{screens.map((t, i) => {
					return (
						<NavBtn
							title={t}
							closed={isOpen}
							key={t}
							delay={i}
							closeFn={toggleMenu}
						/>
					);
				})}
			</nav>
		</>
	);
}
