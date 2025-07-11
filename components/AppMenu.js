'use client';

import Image from 'next/image';
import { useState } from 'react';
import NavBtn from './NavBtn';

const screens = [
	{ title: 'Add A Chord', path: 'add' },
	{ title: 'Learn Chords', path: '/' },
	{ title: 'Time Trial', path: 'time' },
];

export default function AppMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button className="absolute bottom-16 right-4 bg-sand rounded-full w-12 aspect-square z-20">
				<Image
					src={!isOpen ? `/open_btn.svg` : `/close_btn.svg`}
					width={100}
					height={100}
					alt="toggle menu"
					className="w-1/2 mx-auto"
					onClick={toggleMenu}
				></Image>
			</button>
			<nav
				className={`absolute flex flex-col-reverse bg-transparent gap-4 font-serif text-lg right-4 bottom-36 z-20 ${
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
			<div
				className={`w-screen h-screen absolute bg-navy bottom-0 z-10 ${
					isOpen ? `opacity-80` : `opacity-0 pointer-events-none`
				} transition-all`}
				onClick={toggleMenu}
			></div>
		</>
	);
}
