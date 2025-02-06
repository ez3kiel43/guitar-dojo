'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseconfig';
import { useRouter } from 'next/navigation';
import { useInfo } from '@/context/chords_context';

export default function Account() {
	const router = useRouter();
	const { info, loaded } = useInfo;

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			console.log('User signed out successfully');

			router.push('/'); // Example of redirecting after sign-out
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};
	return (
		<main className="text-base text-navy font-serif w-4/5 mx-auto flex flex-col gap-3 pt-6">
			<label className="text-lg font-semibold w-full">
				First Name:
				<input
					type="text"
					readOnly={true}
					value={'Ezra'}
					className="font-normal w-1/2 mx-2 text-navy"
				/>
			</label>

			<label className="text-lg font-semibold w-full">
				Last Name:
				<input
					type="text"
					readOnly={true}
					value={'Evans'}
					className="font-normal w-1/2 mx-2 text-navy"
				/>
			</label>

			<label className="text-lg font-semibold w-full">
				Username:{' '}
				<input
					type="text"
					readOnly={true}
					value={'ee343'}
					className="font-normal w-1/2 mx-2"
				/>
			</label>
			<button className="w-2/5 h-8 border-navy border-2 rounded-md bg-sand font-serif text-lg">
				Edit
			</button>
			<label className="text-lg font-semibold w-full">
				Email:
				<input
					type="text"
					readOnly={true}
					value={'dog@mail.com'}
					className="font-normal w-4/5 ml-2"
				/>
			</label>
			<button className="w-3/5 h-8 border-navy border-2 rounded-md bg-sand font-serif text-lg">
				Reset Password
			</button>

			<button
				className="w-3/5 h-10 border-navy border-2 rounded-md bg-white font-serif text-lg mx-auto mt-16 text-navy"
				onClick={handleSignOut}
			>
				Logout
			</button>

			<button className="w-3/5 h-10 border-rose-800 border-4 rounded-md bg-white font-serif text-lg mx-auto mt-2 text-rose-800">
				Delete Account
			</button>
		</main>
	);
}
