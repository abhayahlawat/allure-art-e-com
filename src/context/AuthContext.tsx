import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient, type Session, type User } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface AuthContextValue {
	user: User | null;
	session: Session | null;
	signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
	signUpWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
	signOut: () => Promise<void>;
	getAuthHeader: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
			setSession(sess);
			setUser(sess?.user ?? null);
		});
		return () => sub.subscription.unsubscribe();
	}, []);

	const value = useMemo<AuthContextValue>(() => ({
		user,
		session,
		async signInWithPassword(email, password) {
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			return { error: error?.message };
		},
		async signUpWithPassword(email, password) {
			const { error } = await supabase.auth.signUp({ email, password });
			return { error: error?.message };
		},
		async signOut() {
			await supabase.auth.signOut();
		},
		async getAuthHeader() {
			const { data } = await supabase.auth.getSession();
			const token = data.session?.access_token;
			return token ? `Bearer ${token}` : undefined;
		}
	}), [user, session]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
