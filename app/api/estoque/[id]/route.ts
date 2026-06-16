/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

type Params = { id: string };

export async function GET(_req: Request, ctx: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const params = await (ctx.params as Promise<Params>);
  const id = params.id;

  try {
    const res = await axios.get(`${baseUrl}/estoque/${id}`);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao consultar estoque por id.' };
    return NextResponse.json(data, { status });
  }
}

export async function PUT(req: Request, ctx: { params: Params | Promise<Params> }) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const params = await (ctx.params as Promise<Params>);
  const id = params.id;
  const body = await req.json();

  try {
    const res = await axios.put(`${baseUrl}/estoque/${id}`, body);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao atualizar estoque.' };
    return NextResponse.json(data, { status });
  }
}

