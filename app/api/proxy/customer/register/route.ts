import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.id || !body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }
    
    console.log('회원가입 요청 데이터:', { 
      id: body.id, 
      name: body.name, 
      email: body.email, 
      password: '***' // 보안상 비밀번호는 로깅하지 않음
    });
    
    try {
      // 백엔드 서버 연결 테스트
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃
      
      try {
        const serverResponse = await fetch('http://localhost:8000', { 
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal
        }).catch(e => {
          console.error('백엔드 서버 연결 확인 실패:', e);
          return null;
        });
        
        clearTimeout(timeoutId);
        
        if (!serverResponse) {
          console.error('백엔드 서버가 응답하지 않습니다.');
          return NextResponse.json(
            { error: '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.' },
            { status: 503 }  // Service Unavailable
          );
        }
      } catch (e) {
        clearTimeout(timeoutId);
        console.error('백엔드 서버 연결 확인 중 오류:', e);
        if (e.name === 'AbortError') {
          return NextResponse.json(
            { error: '백엔드 서버 연결 시간이 초과되었습니다. 서버 상태를 확인해주세요.' },
            { status: 504 }  // Gateway Timeout
          );
        }
        
        return NextResponse.json(
          { error: '백엔드 서버 연결 중 오류가 발생했습니다.' },
          { status: 503 }
        );
      }
      
      // FastAPI 백엔드로 회원가입 요청 전달
      const response = await fetch('http://localhost:8000/api/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: body.id,
          name: body.name,
          email: body.email,
          password: body.password,
        }),
      });

      console.log('백엔드 응답 상태:', response.status);
      
      // 백엔드 응답 처리
      if (!response.ok) {
        let errorMessage = `회원가입 실패: ${response.status}`;
        try {
          // HTML 응답인 경우를 고려하여 text()로 처리
          const responseText = await response.text();
          try {
            // JSON 응답인지 확인 
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.detail || errorMessage;
          } catch (jsonError) {
            // JSON이 아닌 경우 내용이 있으면 앞부분만 표시
            if (responseText && responseText.length > 0) {
              const firstLine = responseText.split('\n')[0].substring(0, 100);
              errorMessage = `${errorMessage} - ${firstLine}${responseText.length > 100 ? '...' : ''}`;
            }
          }
        } catch (parseError) {
          console.error('오류 응답 파싱 실패:', parseError);
        }
        
        // 클라이언트에서 일관된 오류 처리를 위해 422 상태 코드로 반환
        return NextResponse.json(
          { error: errorMessage },
          { status: 422 }
        );
      }

      // 성공 응답
      const data = await response.json();
      return NextResponse.json(data);
    } catch (fetchError: any) {
      console.error('백엔드 서버 연결 오류:', fetchError);
      return NextResponse.json(
        { error: '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('회원가입 프록시 API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 