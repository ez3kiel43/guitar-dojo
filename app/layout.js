import { Solway } from 'next/font/google';
import './globals.css';
import AppMenu from '../components/AppMenu';
import AppHeader from '../components/AppHeader';
import Image from 'next/image';

const solway = Solway({
	variable: '--font-solway',
	subsets: ['latin'],
	weight: '400',
});

export const metadata = {
	title: 'Guitar Dojo',
	description: 'A training app for all your guitar needs',
	icons: {
		icon: '/favicon.svg',
	},
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${solway.variable}  antialiased bg-grain bg-no-repeat bg-center h-screen w-screen overflow-hidden flex flex-col justify-between`}
			>
				<AppHeader></AppHeader>
				<main className="px-4 py-6 h-full">{children}</main>
				<footer className="bg-navy h-20 fixed bottom-0 w-screen">
					<Image
						src="/logo.svg"
						width={175}
						height={100}
						alt="Guitar Dojo Logo"
						className="w-auto h-full"
						priority
					></Image>
					<AppMenu />
				</footer>
			</body>
		</html>
	);
}
