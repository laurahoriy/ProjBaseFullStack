'use client';

import { useParams } from 'next/navigation';
import '@/app/formStyle.css';
import NavBar from '@/app/Components/Navbar';
import FormEstoque from '@/app/Components/formEstoque';

export default function EditarEstoquePage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <>
      <NavBar />
      <FormEstoque estoqueId={id} />
    </>
  );
}
