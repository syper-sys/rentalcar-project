import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api, { ApiError } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const res = await api('/cars/filters', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.response?.status ?? 500 },
    );
  }
}
