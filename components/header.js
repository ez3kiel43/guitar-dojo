'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();

	const getHeaderText = () => {
		switch (pathname) {
			case '/account':
				return 'Account';
			case '/add':
				return 'Add a Chord';
			case '/learn':
				return 'Learn Chords';
			case '/time':
				return 'Time Trial';
			case '/write':
				return 'Write Songs';
		}
	};

	return (
		<header className="bg-sand h-16 font-serif w-screen text-navy p-4">
			<h2 className="text-2xl">{getHeaderText()}</h2>
		</header>
	);
}
