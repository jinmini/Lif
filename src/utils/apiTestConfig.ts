/**
 * API Gateway 테스트 환경 설정
 * 백엔드 개발자에게 받은 실제 API Gateway 정보로 업데이트하세요.
 */

export interface JWTConfig {
    secret: string;
    expiresIn: string;
    testUsers: {
      user: { id: string; name: string; email: string; role: string };
      subscriber: { id: string; name: string; email: string; role: string };
      admin: { id: string; name: string; email: string; role: string };
    };
  }

  export interface ApiGatewayConfig {
    baseUrl: string;
  }
  
// API Gateway 서버 정보
export const API_GATEWAY_CONFIG = {
  // 백엔드 개발자의 API Gateway URL (IP:Port)
  baseUrl: 'http://127.0.0.1:8000',  // 예: 'http://192.168.0.100:8080'
  
  // API 엔드포인트 (실제 마이크로서비스 경로)
  endpoints: {
    // 공개 API (인증 필요 없음)
    public: {
      getPublicData: '/api/public/data',
    },
    
    // 보호된 API (인증 필요)
    protected: {
      // 일반 사용자도 접근 가능한 API
      user: {
        getUserData: '/api/user/data',
      },
      
      // 구독자만 접근 가능한 API
      subscriber: {
        getEsgData: '/api/subscriber/esg-data',
        getReports: '/api/subscriber/reports',
      },
      
      // 관리자만 접근 가능한 API
      admin: {
        getUsers: '/api/admin/users',
        updateUser: '/api/admin/users',
        createData: '/api/admin/data',
      },
    },
  },
};

// JWT 설정
export const JWT_CONFIG = {
  // 테스트용 시크릿 키 (실제 운영에서는 사용하지 않음)
  secret: 'lif_test_secret_key_for_development',
  
  // 토큰 만료 시간
  expiresIn: '1h',
  
  // 테스트용 사용자 정보
  testUsers: {
    user: {
      id: '1001',
      name: '일반 사용자',
      email: 'user@example.com',
      role: 'user',
    },
    subscriber: {
      id: '2001',
      name: '구독자',
      email: 'subscriber@example.com',
      role: 'subscriber',
    },
    admin: {
      id: '3001',
      name: '관리자',
      email: 'admin@example.com',
      role: 'admin',
    },
  },
}; 