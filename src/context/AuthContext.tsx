import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient, type Session, type User } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false, // Disable auto refresh to have more control
    persistSession: false,  // Disable persistence to manage it manually
    detectSessionInUrl: true,
  },
});

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

  // Helper function to clear all auth data
  const clearAuthData = () => {
    // Clear all auth-related data from storage
    const storageKeys = [
      'sb-access-token',
      'sb-refresh-token',
      'sb-provider-token',
      'supabase.auth.token',
      'supabase.auth.token.iss',
      'supabase:token',
      'supabase:token.iss',
      '@supabase/auth-token',
      'supabase-auth-token',
    ];

    storageKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Clear all cookies
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  // Handle auth state changes
  useEffect(() => {
    // Function to update session state
    const updateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Updating session:', session);
      setSession(session);
      setUser(session?.user ?? null);      
    };

    // Get initial session
    updateSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_OUT') {
        // Clear all auth data
        const storageKeys = [
          'sb-access-token',
          'sb-refresh-token',
          'sb-provider-token',
          'supabase.auth.token',
          'supabase.auth.token.iss',
          'supabase:token',
          'supabase:token.iss',
          '@supabase/auth-token',
          'supabase-auth-token',
        ];

        storageKeys.forEach(key => {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        // Clear local state
        setSession(null);
        setUser(null);
      } else {
        // Update session for other auth events
        setSession(session);
        setUser(session?.user ?? null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    async signInWithPassword(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message };
    },
    async signUpWithPassword(email: string, password: string) {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error: error?.message };
    },
    async signOut() {
      try {
        // 1. Clear local state first to prevent any UI flicker
        setSession(null);
        setUser(null);
        
        // 2. Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // 3. Clear all auth data from storage
        const storageKeys = [
          'sb-access-token',
          'sb-refresh-token',
          'sb-provider-token',
          'supabase.auth.token',
          'supabase.auth.token.iss',
          'supabase:token',
          'supabase:token.iss',
          '@supabase/auth-token',
          'supabase-auth-token',
        ];

        // Clear from all possible storage locations
        storageKeys.forEach(key => {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `${key}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        });

        // Clear all cookies
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.split('=').map(c => c.trim());
          if (name) {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          }
        });

        // 4. Force a hard redirect to the home page
        window.location.href = '/';
      } catch (error) {
        console.error('Error during sign out:', error);
        // Still try to clear everything and redirect
        setSession(null);
        setUser(null);
        window.location.href = '/';
      }
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
