'use client';

import { useEffect } from 'react';
import '@/app/formStyle.css';
import NavBar from '@/app/Components/Navbar';
import FormEstoque from '@/app/Components/formEstoque';
import { useEstoque } from '@/app/hooks/useEstoque';
import Link from 'next/link';

export default function EstoquePage() {
  const { estoques, loading, listarEstoques } = useEstoque();

  useEffect(() => {
    listarEstoques();
  }, [listarEstoques]);

  return (
    <>
      <NavBar />
      <main className="bb-page">
        <section className="bb-card" style={{ marginBottom: '24px' }}>
          <h1 className="bb-page__title">Estoque</h1>
          <p className="bb-page__subtitle">Veja os itens em estoque e clique em editar para alterar a quantidade ou localização.</p>
        </section>

        <section className="bb-card" style={{ marginBottom: '24px' }}>
          {loading ? (
            <p>Carregando estoque...</p>
          ) : (
            <div className="bb-grid">
              {estoques.map(item => (
                <div key={item.id} className="bb-card bb-card--small" style={{ padding: '16px' }}>
                  <h3 style={{ marginBottom: '8px' }}>{item.produto?.nome ?? item.produto?.id ?? 'Produto não informado'}</h3>
                  <p><strong>Localização:</strong> {item.localizacao || '—'}</p>
                  <p><strong>Quantidade:</strong> {item.quantidade}</p>
                  <Link href={`/estoque/${item.id}`} className="bb-btn bb-btn--ghost" style={{ marginTop: '12px', display: 'inline-block' }}>
                    Editar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <FormEstoque />
      </main>
    </>
  );
}
