import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY as string,
});

async function getResponse(req: Request): Promise<Response> {
  const { username } = await req.json();

  const user = await client.lookupUserByUsername(username);
  return NextResponse.json(user);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
