'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initSession = async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session);
			setLoading(false);
		};

		initSession();

		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setSession(session);
			}
		);

		return () => {
			listener?.subscription?.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ session, user: session?.user, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
