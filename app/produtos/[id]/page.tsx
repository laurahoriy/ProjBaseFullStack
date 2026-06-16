'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/app/Components/Navbar';
import ProdutosForm from '@/app/Components/ProdutosForm';
import '@/app/formStyle.css';

export default function EditarProdutoPage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <>
            <NavBar />
            <ProdutosForm produtoId={id} />
        </>
    );
}