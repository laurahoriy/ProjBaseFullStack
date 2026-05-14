
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AuthLayout from '../Components/AuthLayout';

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
    <AuthLayout>
      <main className="bb-page">

      <h1 className="bb-page__title">Seja bem-vindo, {nome || 'Visitante'}!</h1>
      <p className="bb-page__subtitle">Esta é uma área protegida.</p>

      <section className="bb-card" aria-label="Em breve">
        <h2 className="bb-card__title">Cadastro / Gerenciamento</h2>
        <p className="bb-card__text">
          Espaço reservado para futuros cadastros relacionados ao dashboard.
        </p>
      </section>

      <div className="bb-actions">
        <button className="bb-btn bb-btn--ghost" onClick={logout}>
          Sair do Sistema
        </button>
      </div>
      </main>
    </AuthLayout>
  );
}


