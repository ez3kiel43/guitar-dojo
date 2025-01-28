'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();

	const getHeaderText = () => {
		switch (pathname) {
			case '/user_account/account':
				return 'Account';
			case '/user_account/add':
				return 'Add a Chord';
			case '/user_account/time':
				return 'Time Trial';
			default:
				return 'Learn Chords';
		}
	};

	return (
		<header className="bg-sand h-16 font-serif w-screen text-navy p-4">
			<h2 className="text-2xl">{getHeaderText()}</h2>
		</header>
	);
}
