import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Implement get all users logic
    return NextResponse.json(
      { message: 'Get all users endpoint' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
