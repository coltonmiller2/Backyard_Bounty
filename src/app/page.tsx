'use client';

import { BackyardPage } from '@/components/backyard-page';
import firebaseApp from '../lib/firebaseConfig';
import { getAuth, User, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p>Loading...</p>
            </div>
        </div>
    );
  }

  if (user) {
    return <BackyardPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center p-8 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Welcome to Backyard Bounty</h1>
            <p className="text-muted-foreground mb-6">Please sign in to continue.</p>
            <Button onClick={handleLogin} size="lg">Sign in with Google</Button>
        </div>
    </div>
  );
}
