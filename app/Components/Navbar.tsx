'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {

  const router = useRouter();

  function sairDoSite() {
    Cookies.remove('logged');
    Cookies.remove('userName');
    router.push('/');
  }

  return (
    <header className="bb-nav">
      <div className="bb-nav__inner">
        <div className="bb-nav__brand">
          <span className="bb-nav__logo">ProJ</span>
          <span className="bb-nav__title">Acesso</span>
        </div>

        <nav className="bb-nav__links" aria-label="Navegação principal">
          <Link className="bb-nav__link" href="/produtos">
            Produtos
          </Link>


          <Link className="bb-nav__link" href="/dashboard">
            Dashboard
          </Link>

          <button type="button" className="bb-nav__button" onClick={sairDoSite}>
            Sair
          </button>

        </nav>
      </div>
    </header>
  );
}

