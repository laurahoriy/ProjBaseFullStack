/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

type Params = { produtoId: string };

export async function GET(_: Request, { params }: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const p = await (params as Promise<Params>);
  const produtoId = p.produtoId;

  try {
    const res = await axios.get(`${baseUrl}/estoque/produto/${produtoId}`);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao consultar estoque por produto.' };
    return NextResponse.json(data, { status });
  }
}

