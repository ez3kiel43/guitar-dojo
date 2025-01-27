'use client';

import Image from 'next/image';
import { useState } from 'react';
import NavBtn from './nav_btn';

const screens = [
	{ title: 'Account', path: 'account' },
	{ title: 'Add A Chord', path: 'add' },
	{ title: 'Learn Chords', path: '/' },
	{ title: 'Time Trial', path: 'time' },
];

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button className="absolute bottom-20 right-4 bg-sand rounded-full w-16 aspect-square">
				<Image
					src={!isOpen ? `/open_btn.svg` : `close_btn.svg`}
					width={100}
					height={100}
					alt="toggle menu"
					className="w-1/2 mx-auto"
					onClick={toggleMenu}
				></Image>
			</button>
			<nav
				className={`absolute flex flex-col-reverse bg-transparent gap-4 font-serif text-xl right-4 bottom-40 ${
					isOpen ? 'visible' : 'invisible'
				}`}
			>
				{screens.map((t, i) => {
					return (
						<NavBtn
							title={t.title}
							closed={isOpen}
							key={`${t.title}_${i}`}
							delay={i}
							closeFn={toggleMenu}
							path={t.path}
						/>
					);
				})}
			</nav>
		</>
	);
}
