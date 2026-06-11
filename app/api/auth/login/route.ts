import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await request.json();
    // TODO: Implement login logic
    return NextResponse.json(
      { message: 'Login endpoint' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
