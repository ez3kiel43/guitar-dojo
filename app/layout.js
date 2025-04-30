import { Solway } from 'next/font/google';
import './globals.css';
import Menu from '../components/Menu';
import Header from './../components/Header';
import Image from 'next/image';
import { AuthProvider } from '@/context/AuthContext';

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
				className={`${solway.variable}  antialiased bg-white max-h-screen w-screen overflow-hidden`}
			>
				<Header></Header>
				<AuthProvider>{children}</AuthProvider>
				<footer className="bg-navy h-28 fixed bottom-0 w-screen">
					<Image
						src="/guitar_dojo_logo.png"
						width={175}
						height={100}
						alt="Guitar Dojo Logo"
						className="w-auto h-full"
						priority
					></Image>
					<Menu />
				</footer>
			</body>
		</html>
	);
}
