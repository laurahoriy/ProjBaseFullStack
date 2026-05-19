'use client';

import { useState, useCallback, FormEvent } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produto';
import { useRouter } from 'next/navigation';

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Estados para o formulário (seguindo seu padrão de states separados)
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [url, setUrl] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    // GET - Listar
    const listarProdutos = useCallback(async () => {
        setLoading(true);
        try {
            const resposta = await api.get('/produtos/');
            setProdutos(resposta.data);
        } catch (error) {
            alert("Erro ao buscar produtos");
        } finally {
            setLoading(false);
        }
    }, []);

    // POST / PUT - Salvar
    const salvar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const precoFormatado = Number(preco.toString().replace(',', '.'));
        if (!nome.trim() || !descricao.trim() || !url.trim() || isNaN(precoFormatado)) {
            alert('Preencha todos os campos corretamente e use um preço válido.');
            return;
        }

        const dados: Produto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: precoFormatado,
            url: url.trim(),
        };

        try {
            if (editandoId) {
                await api.put(`/produtos/${editandoId}`, dados);
            } else {
                await api.post('/produtos/', dados);
            }

            limparFormulario();
            alert('Produto salvo com sucesso!');
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Erro ao salvar produto:', error);
            const mensagem = error?.response?.data?.message || error?.message || 'Erro ao salvar o produto. Verifique os dados e tente novamente.';
            alert(`Erro ao salvar produto: ${mensagem}`);
        }
    };

    // DELETE
    const excluir = async (id: number) => {
        if (!confirm("Excluir este produto?")) return;
        try {
            await api.delete(`/produtos/${id}`);
            listarProdutos();
        } catch (error) {
            alert("Erro ao excluir");
        }
    };

    const prepararEdicao = (p: Produto) => {
        setEditandoId(p.id!);
        setNome(p.nome);
        setDescricao(p.descricao);
        setPreco(p.preco.toString());
        setUrl(p.url);
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setUrl('');
    };

    return {
        produtos, loading, listarProdutos, salvar, excluir, prepararEdicao,
        nome, setNome, descricao, setDescricao, preco, setPreco, url, setUrl,
        editandoId, limparFormulario
    };
}