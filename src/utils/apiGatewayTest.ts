// import { callApiGateway, testApiAccessByRole, decodeAndPrintToken } from './apiTestUtils';
// import { API_GATEWAY_CONFIG } from './apiTestConfig';

// // ----- 테스트 실행 함수 -----
// async function runApiGatewayTests() {
//   console.log('===== API Gateway 테스트 시작 =====');
//   console.log(`API Gateway URL: ${API_GATEWAY_CONFIG.baseUrl}`);
  
//   try {
//     // 테스트 1: 일반 데이터 조회 (모든 역할 접근 가능한 API)
//     console.log('\n\n🔍 테스트 1: 일반 데이터 조회');
//     await callApiGateway(API_GATEWAY_CONFIG.endpoints.public.getPublicData, 'GET');
    
//     // 테스트 2: 각 역할별 API 접근 테스트 (보호된 API - 사용자 데이터)
//     console.log('\n\n🔍 테스트 2: 역할별 사용자 데이터 접근 권한 테스트');
//     await testApiAccessByRole(API_GATEWAY_CONFIG.endpoints.protected.user.getUserData);
    
//     // 테스트 3: 구독자 전용 API 접근 테스트
//     console.log('\n\n🔍 테스트 3: 구독자 전용 ESG 데이터 접근 테스트');
//     await testApiAccessByRole(API_GATEWAY_CONFIG.endpoints.protected.subscriber.getEsgData);
    
//     // 테스트 4: 관리자 전용 API 접근 테스트
//     console.log('\n\n🔍 테스트 4: 관리자 전용 사용자 목록 접근 테스트');
//     await testApiAccessByRole(API_GATEWAY_CONFIG.endpoints.protected.admin.getUsers);
    
//     // 테스트 5: 데이터 생성 테스트 (POST 요청)
//     console.log('\n\n🔍 테스트 5: 데이터 생성 테스트 (관리자 권한)');
//     const testData = {
//       title: '테스트 제목',
//       content: '테스트 내용',
//       timestamp: new Date().toISOString()
//     };
//     await callApiGateway(API_GATEWAY_CONFIG.endpoints.protected.admin.createData, 'POST', testData, 'admin');
    
//     console.log('\n===== API Gateway 테스트 완료 =====');
//   } catch (error) {
//     console.error('\n❌ API Gateway 테스트 중 오류 발생:', error);
//   }
// }

// // JWT 토큰 생성 및 내용 확인 테스트
// function testJwtTokenGeneration() {
//   console.log('\n===== JWT 토큰 생성 테스트 =====');
  
//   // 일반 사용자 토큰 테스트
//   const userToken = callApiGateway(API_GATEWAY_CONFIG.endpoints.public.getPublicData, 'GET', null, 'user')
//     .then(() => console.log('일반 사용자 토큰 생성 성공'))
//     .catch(error => console.error('일반 사용자 토큰 생성 실패:', error));
    
//   // 구독자 토큰 테스트
//   const subscriberToken = callApiGateway(API_GATEWAY_CONFIG.endpoints.public.getPublicData, 'GET', null, 'subscriber')
//     .then(() => console.log('구독자 토큰 생성 성공'))
//     .catch(error => console.error('구독자 토큰 생성 실패:', error));
    
//   // 관리자 토큰 테스트
//   const adminToken = callApiGateway(API_GATEWAY_CONFIG.endpoints.public.getPublicData, 'GET', null, 'admin')
//     .then(() => console.log('관리자 토큰 생성 성공'))
//     .catch(error => console.error('관리자 토큰 생성 실패:', error));
  
//   return Promise.all([userToken, subscriberToken, adminToken])
//     .then(() => console.log('\n===== JWT 토큰 생성 테스트 완료 ====='))
//     .catch(error => console.error('\n❌ JWT 토큰 생성 테스트 중 오류 발생:', error));
// }

// // 테스트 함수 실행
// // 이 파일을 직접 실행하는 경우에만 아래 코드가 실행됨
// if (require.main === module) {
//   console.log('시작합니다... API Gateway 테스트를 실행합니다.');
//   // 토큰 생성 테스트 
//   testJwtTokenGeneration()
//     .then(() => {
//       // API Gateway 테스트
//       return runApiGatewayTests();
//     })
//     .catch(error => {
//       console.error('테스트 실행 중 오류 발생:', error);
//     });
// }

// // 다른 파일에서 import할 수 있도록 함수 export
// export { runApiGatewayTests, testJwtTokenGeneration };

/*
실행 방법:
1. ts-node를 사용하는 경우: npx ts-node src/utils/apiGatewayTest.ts
2. 브라우저 콘솔에서 테스트하는 경우: 이 파일을 import하고 runApiGatewayTests() 호출
*/ 