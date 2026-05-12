'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  useEffect(() => {
    const userName = Cookies.get('userName');

    if (userName) {
      setNome(userName);
    } else {
      router.push('/');
    }
  }, [router]);

  function logout() {
    Cookies.remove('logged');
    Cookies.remove('userName');
    router.push('/');
  }

  return (
    <div>
      <h1>Seja bem-vindo, {nome || 'Visitante'}!</h1>
      <p>Esta é uma área protegida</p>
      <button onClick={logout}>Sair do Sistema</button>
    </div>
  );
}
