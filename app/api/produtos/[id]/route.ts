/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

type Params = { id: string };

export async function GET(_: Request, { params }: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const p = await (params as Promise<Params>);
  const id = p.id;

  try {
    const res = await axios.get(`${baseUrl}/produtos/${id}`);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao consultar produto por id.' };
    return NextResponse.json(data, { status });
  }
}

export async function PUT(req: Request, { params }: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const p = await (params as Promise<Params>);
  const id = p.id;
  const body = await req.json();

  try {
    const res = await axios.put(`${baseUrl}/produtos/${id}`, body);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao atualizar produto.' };
    return NextResponse.json(data, { status });
  }
}

export async function DELETE(_: Request, { params }: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const p = await (params as Promise<Params>);
  const id = p.id;

  try {
    await axios.delete(`${baseUrl}/produtos/${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao excluir produto.' };
    return NextResponse.json(data, { status });
  }
}

