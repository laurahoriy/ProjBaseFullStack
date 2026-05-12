'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export function useRegister() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function cadastrar(evento: React.FormEvent) {
    // Impede o comportamento padrão do navegador (recarregar a página)
    evento.preventDefault();

    // Limpa qualquer erro anterior
    setError('');

    // Validação simples para garantir que as senhas digitadas sejam iguais
    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    // Corpo que será enviado para o back-end.
    const dadosCadastro = {
      name: name,
      username: username,
      password: password,
    };

    api
      .post('/users/', dadosCadastro)
      .then(() => {
        // Se o cadastro funcionar, redireciona de volta para a tela de login.
        router.push('/');
      })
      .catch((err) => {
        // Em caso de erro (ex: usuário já existe, falha de validação, etc)
        console.error('Erro ao cadastrar usuário:', err);
        setError('Falha ao cadastrar. Verifique os dados e tente novamente.');
      });
  }

  return {
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
  };
}
