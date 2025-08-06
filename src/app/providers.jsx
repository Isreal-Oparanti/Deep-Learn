'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@/context/AuthContext.jsx';


export default function Providers({ children }) {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
