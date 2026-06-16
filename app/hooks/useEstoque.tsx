'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Estoque } from '../types/Estoque';
import { useRouter } from 'next/navigation';

export function useEstoque() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [estoques, setEstoques] = useState<Estoque[]>([]);

    const [localizacao, setLocalizacao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    // GET - Listar estoques
    const listarEstoques = async () => {
        setLoading(true);
        try {
            // Padrão comum: GET /estoque/ (Spring Data REST estilo) ou GET /estoque
            // Vamos tentar a rota com barra, que costuma bater com seu uso do /produtos/
            const resposta = await api.get('/estoque/');
            setEstoques(resposta.data ?? []);
        } catch (error) {
            console.error('Erro ao listar estoques:', error);
            // Mantém lista vazia para não quebrar a UI
            setEstoques([]);
        } finally {
            setLoading(false);
        }
    };

    // GET - Buscar estoque pelo ID do próprio estoque
    const buscarEstoquePorId = async (id: number) => {
        setLoading(true);
        try {
            const resposta = await api.get(`/estoque/${id}`);
            if (resposta.data) {
                prepararEdicao(resposta.data);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do estoque:', error);
            alert("Erro ao buscar os dados do estoque.");
        } finally {
            setLoading(false);
        }
    };

    // GET - Buscar estoque de um produto específico
    const buscarEstoquePorProduto = async (produtoId: number) => {
        setLoading(true);
        try {
            // Supondo que a sua API Spring tenha um endpoint que busca o estoque pelo ID do produto
            const resposta = await api.get(`/estoque/produto/${produtoId}`);
            if (resposta.data) {
                prepararEdicao(resposta.data);
            }
        } catch (_error) {
            // Se der erro (ex: 404), significa que ainda não tem estoque, então preparamos para criar
            setIdProduto(produtoId.toString());
        } finally {
            setLoading(false);
        }
    };

    // POST / PUT - Salvar Estoque
    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        // Enviamos o ID em todas as nomenclaturas comuns para garantir 
        // que o Spring Boot (Jackson) consiga fazer o "bind" com a sua classe Java.
        const dados = {
            localizacao: localizacao,
            quantidade: Number(quantidade),

            // 1. Caso o Java espere o formato snake_case
            id_produto: Number(idProduto),

            // 2. Caso o Java espere o formato camelCase (padrão do Java)
            idProduto: Number(idProduto),

            // 3. Caso o Java espere o objeto de relacionamento
            produto: {
                id: Number(idProduto)
            }
        };

        try {
            if (editandoId) {
                // Atualiza o estoque existente
                await api.put(`/estoque/${editandoId}`, dados);
            } else {
                // Cria um novo estoque
                await api.post('/estoque/', dados);
            }
            limparFormulario();
            alert("Estoque atualizado com sucesso!");
            router.push('/dashboard');
        } catch (error) {
            console.error("Erro detalhado:", error);
            alert("Erro ao salvar estoque. Verifique o console.");
        }
    };

    const prepararEdicao = (e: Estoque) => {
        setEditandoId(e.id!); // CORRIGIDO: usando e.id em vez de e.id_estoque
        setLocalizacao(e.localizacao);
        setQuantidade(e.quantidade.toString());

        // Verifica se o Spring mandou o objeto aninhado (e.produto.id)
        // (se o backend mandar só o id direto, pode precisar ajustar aqui)
        const produtoId = e.produto?.id;
        setIdProduto(produtoId ? produtoId.toString() : '');
    };

    const limparFormulario = () => {
        setEditandoId(null);
        setLocalizacao('');
        setQuantidade('');
        setIdProduto('');
    };

    return {
        estoques,
        loading,
        salvar,
        listarEstoques,
        buscarEstoquePorProduto,
        localizacao,
        setLocalizacao,
        quantidade,
        setQuantidade,
        idProduto,
        setIdProduto,
        editandoId,
        limparFormulario,
        buscarEstoquePorId
    };
}
