'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const ok = Cookies.get('logged') === 'true' || !!Cookies.get('userName');
    setIsAuthed(ok);
  }, []);

  if (!isAuthed) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

