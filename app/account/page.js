'use client';
import SignIn from '@/components/SignIn';
import supabase from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import LoadingAnimation from '@/components/LoadingAnim';

export default function Account() {
	const { session, loading } = useAuth();

	if (loading) return <LoadingAnimation />;

	if (session) {
		return (
			<main className="w-10/12 mx-auto py-12 overflow-hidden relative md:flex text-navy font-serif text-xl">
				<p className="my-2">
					Name: {session.user?.identities[0]?.identity_data.name}
				</p>
				<p className="my-2">Email: {session.user.email}</p>
				<button className="bg-sand border-navy rounded-md border-4 p-2 my-6 w-4/5">
					Change Password
				</button>

				<button
					onClick={async () => {
						await supabase.auth.signOut();
					}}
					className="border-red text-red rounded-md border-4 p-2 my-6 w-3/5"
				>
					Logout
				</button>
				<button className="border-red text-red rounded-md border-4 p-2 mt-24 w-4/5">
					Delete Account
				</button>
			</main>
		);
	} else {
		return <SignIn />;
	}
}
