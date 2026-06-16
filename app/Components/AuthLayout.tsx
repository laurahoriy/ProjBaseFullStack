'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isAuthed] = useState(() => Cookies.get('logged') === 'true' || !!Cookies.get('userName'));

  if (!isAuthed) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

