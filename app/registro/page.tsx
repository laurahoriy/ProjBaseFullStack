'use client';

import Link from 'next/link';
import { useRegister } from '../hooks/useRegister';
import '../formStyle.css';

export default function Registro() {
  const {
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    cadastrar,
  } = useRegister();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Cadastro de Usuário</h1>

        <form onSubmit={cadastrar}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login">
            Cadastrar
          </button>
        </form>

        <div className="footer-link">
          <span>Já tem conta? </span>
          <Link href="/">Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
}
