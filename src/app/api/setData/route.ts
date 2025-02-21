import { NextResponse } from 'next/server';

let sharedData: string | null = null;

export async function POST(request: Request) {
  const body = await request.json();
  sharedData = body.data;
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ data: sharedData });
}