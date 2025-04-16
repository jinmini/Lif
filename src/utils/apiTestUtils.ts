// import jwt from 'jsonwebtoken';
// import axios, { AxiosRequestConfig, Method } from 'axios';
// import { API_GATEWAY_CONFIG, JWT_CONFIG } from './apiTestConfig';

// const getTestUserInfo = (role: 'user' | 'subscriber' | 'admin') => {
//   return JWT_CONFIG.testUsers[role];
// };

// const createDefaultPayload = (userInfo: any, payload: any) => {
//   return {
//     sub: userInfo.id,
//     name: userInfo.name,
//     email: userInfo.email,
//     role: userInfo.role,
//     iat: Math.floor(Date.now() / 1000),
//     ...payload
//   };
// };

// export const generateFakeJwtToken = (
//   payload: any = {},
//   expiresIn: string = JWT_CONFIG.expiresIn
// ): string => {
//   const role = payload.role || 'user';
//   const userInfo = getTestUserInfo(role);
//   const defaultPayload = createDefaultPayload(userInfo, payload);
//   return jwt.sign(defaultPayload, JWT_CONFIG.secret, { expiresIn });
// };

// export const callApiGateway = async (
//   endpoint: string,
//   method: Method = 'GET',
//   data: any = null,
//   role: 'user' | 'subscriber' | 'admin' = 'user'
// ): Promise<any> => {
//   try {
//     const token = generateFakeJwtToken({ role });

//     const config: AxiosRequestConfig = {
//       method,
//       url: `${API_GATEWAY_CONFIG.baseUrl}${endpoint}`,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       data: data ? JSON.stringify(data) : undefined
//     };

//     console.log(`🔑 테스트 토큰 생성: ${token}`);
//     console.log(`📡 API 요청: ${method} ${config.url}`);
//     if (data) {
//       console.log(`📦 요청 데이터:`, data);
//     }

//     const response = await axios(config);

//     console.log(`✅ API 응답 상태: ${response.status}`);
//     console.log(`📦 API 응답 데이터:`, response.data);

//     return response.data;
//   } catch (error: any) {
//     if (error.isAxiosError) {
//       console.error(`❌ API 요청 실패: ${error.message}`);
//       if (error.response) {
//         console.error(`📦 에러 응답 데이터:`, error.response.data);
//         console.error(`📦 에러 응답 상태:`, error.response.status);
//       } else {
//         console.error(`❌ 응답 없음`);
//       }
//     } else {
//       console.error(`❌ 오류 발생:`, error);
//     }
//     throw error;
//   }
// };

// export const testApiAccessByRole = async (endpoint: string): Promise<void> => {
//   const roles: Array<'user' | 'subscriber' | 'admin'> = ['user', 'subscriber', 'admin'];

//   console.log(`\n🧪 API 접근 권한 테스트: ${endpoint}`);
//   console.log(`====================================`);

//   for (const role of roles) {
//     console.log(`\n📝 역할: ${role}`);
//     try {
//       const result = await callApiGateway(endpoint, 'GET', null, role);
//       console.log(`✅ ${role} 접근 성공!`);
//       console.log(`📦 응답 결과:`, result);
//     } catch (error: any) {
//       console.error(`❌ ${role} 접근 실패!`);
//       if (error.response) {
//         console.error(`📦 에러 응답 데이터:`, error.response.data);
//       }
//     }
//     console.log(`------------------------------------`);
//   }
// };

// export const decodeAndPrintToken = (token: string): void => {
//   try {
//     const decoded = jwt.decode(token);
//     console.log('🔍 토큰 내용:', decoded);
//   } catch (error) {
//     console.error('❌ 토큰 해석 실패:', error);
//   }
// };
// 사용 예시:
// 테스트 코드를 여기에 작성하거나 다른 파일에서 import하여 사용
/*
// 예제 1: 단일 API 호출
callApiGateway('/api/data', 'GET')
  .then(response => console.log('성공:', response))
  .catch(error => console.error('실패:', error));

// 예제 2: 각 역할별 접근 테스트
testApiAccessByRole('/api/protected-data');
*/ 