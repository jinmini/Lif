import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.id || !body.password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }
    
    // FastAPI 백엔드로 로그인 요청 전달
    const response = await fetch('http://localhost:8000/api/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: body.id,
        password: body.password,
      }),
    });

    // 백엔드 응답 처리
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || `로그인 실패: ${response.status}` },
        { status: response.status }
      );
    }

    // 성공 응답
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('로그인 프록시 API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 