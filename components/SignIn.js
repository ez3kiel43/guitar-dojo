'use client';

import supabase from '@/lib/supabase';
export default function SignIn() {
	return (
		<main className="w-full h-48 flex flex-col justify-center ">
			<button
				className="w-4/5 h-12 text-center mx-auto font-serif text-lg text-navy border-navy border-4 rounded-md"
				onClick={() => {
					supabase.auth.signInWithOAuth({
						provider: 'google',
					});
				}}
			>
				Sign In with Google
			</button>
		</main>
	);
}
