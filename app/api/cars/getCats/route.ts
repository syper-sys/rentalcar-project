import { NextRequest, NextResponse } from 'next/server';
import api, { ApiError } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  try {
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 10);
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);

    const res = await api('/cars', {
      params: {
        page,
        perPage,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}