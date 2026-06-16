/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';

  try {
    const res = await axios.get(`${baseUrl}/produtos/`);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao consultar produtos.' };
    return NextResponse.json(data, { status });
  }
}

export async function POST(req: Request) {
  const baseUrl = process.env.SPRING_URL ?? 'http://localhost:8080';
  const body = await req.json();

  try {
    const res = await axios.post(`${baseUrl}/produtos/`, body);
    return NextResponse.json(res.data);
  } catch (err) {
    const status = (err as any)?.response?.status ?? 500;
    const data = (err as any)?.response?.data ?? { message: 'Erro ao criar produto.' };
    return NextResponse.json(data, { status });
  }
}

