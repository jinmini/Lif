import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:8000/api/customer/list', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 요청 실패: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('프록시 API 오류:', error);
    return NextResponse.json(
      { error: '백엔드 서버에 연결할 수 없습니다.' },
      { status: 500 }
    );
  }
} 