'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

const NoSSRForm = dynamic(() => import('../components/login_form.js'), {
	ssr: false,
});

export default function SignIn() {
	return (
		<>
			<header className="bg-navy h-28 w-45 mx-auto text-center">
				<Image
					src="/guitar_dojo_logo.png"
					width={175}
					height={100}
					alt="Guitar Dojo Logo"
					className="mx-auto"
				></Image>
			</header>
			<NoSSRForm />
		</>
	);
}
