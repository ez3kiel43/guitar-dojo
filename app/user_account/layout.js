import { UserInfoProvider } from '@/context/chords_context';
import Menu from '@/components/menu';
import Image from 'next/image';
import Header from '@/components/header';

import { onAuthStateChanged } from 'firebase/auth';

export default function UserAccount({ children }) {
	return (
		<>
			<Header></Header>
			<UserInfoProvider>{children}</UserInfoProvider>

			<footer className="bg-navy h-28 fixed bottom-0 w-screen">
				<Image
					src="/guitar_dojo_logo.png"
					width={175}
					height={100}
					alt="Guitar Dojo Logo"
				></Image>
				<Menu />
			</footer>
		</>
	);
}
