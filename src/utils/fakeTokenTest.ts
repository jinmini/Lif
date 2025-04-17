import jwt from 'jsonwebtoken';
import axios from 'axios';

// API 서버 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// 테스트용 시크릿 키 (실제 프로덕션에서는 사용하면 안 됨)
const JWT_SECRET = process.env.JWT_SECRET || 'lif_test_secret_key_for_development';

/**
 * 테스트용 Fake JWT 토큰 생성 (기본 user 역할)
 * @returns 생성된 JWT 토큰
 */
export function generateFakeToken(): string {
  // JWT 페이로드
  const payload = {
    sub: '1001',                            // 사용자 ID
    name: '테스트 사용자',                   // 사용자 이름 
    email: 'user@example.com',              // 이메일
    role: 'user',                           // 역할 (기본 사용자)
    iat: Math.floor(Date.now() / 1000),     // 발행 시간
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 만료 시간 (1시간)
  };

  // JWT 토큰 생성
  return jwt.sign(payload, JWT_SECRET);
}

/**
 * API 테스트 요청 함수
 * @param endpoint API 엔드포인트
 * @param method HTTP 메서드
 * @param data 요청 바디 데이터 (선택사항)
 */
export async function testApi(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<any> {
  try {
    // 토큰 생성
    const token = generateFakeToken();
    console.log(`🔑 테스트 토큰 생성:`, token);
    
    // 토큰 디코딩하여 내용 확인 (디버깅용)
    const decoded = jwt.decode(token); // 이 디코딩은 서명을 검증하지 않음음
    console.log('📄 토큰 내용:', decoded);
    
    // API 요청 설정
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      ...(method !== 'GET' && method !== 'DELETE' ? { data } : {}),
    };
    
    console.log(`📡 API 요청: ${method} ${config.url}`);
    if (data) console.log('📦 요청 데이터:', data);
    
    // API 요청 실행
    const response = await axios(config);
    
    console.log(`✅ 응답 상태: ${response.status}`);
    console.log(`📦 응답 데이터:`, response.data);
    
    return response.data;
  } catch (error: any) {
    console.error(`❌ API 요청 실패: ${error.message}`);
    if (error.response) {
      console.error(`📦 에러 응답 데이터:`, error.response.data);
      console.error(`📦 에러 응답 상태:`, error.response.status);
    }
    throw error;
  }
}

// 사용 예시
if (require.main === module) {
  // 기본 테스트 실행
  (async () => {
    try {
      // 1. 소셜 로그인 테스트
      console.log('\n🔍 1. 사용자 인증 테스트:');
      await testApi('/auth/me');
      
      // 2. 프로필 데이터 테스트
      console.log('\n🔍 2. 프로필 데이터 테스트:');
      await testApi('/user/profile');
      
      // 3. 데이터 전송 테스트
      console.log('\n🔍 3. 데이터 전송 테스트:');
      const testData = {
        name: '테스트 사용자',
        email: 'user@example.com',
        timestamp: new Date().toISOString()
      };
      await testApi('/user/update-profile', 'POST', testData);
      
    } catch (error) {
      console.error('테스트 중 오류 발생:', error);
    }
  })();
}

// 사용 방법:
// 1. 직접 실행: npx ts-node src/utils/fakeTokenTest.ts
// 2. 다른 파일에서 import하여 사용:
//    import { generateFakeToken, testApi } from '@/utils/fakeTokenTest'; 