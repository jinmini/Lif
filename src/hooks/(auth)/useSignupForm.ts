// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { signup } from '@/services/api/auth';

// interface SignupData {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }

// export const useSignup = () => {
//   const router = useRouter();
//   const [data, setData] = useState<SignupData>({
//     id: "",
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!data.id || !data.name || !data.email || !data.password) {
//       setError("모든 필드를 입력해주세요.");
//       setIsLoading(false);
//       return;
//     }

//     // 입력된 값을 확인하는 alert 창 표시
//     alert(`입력된 정보:\n${JSON.stringify({
//       아이디: data.id,
//       이름: data.name,
//       이메일: data.email,
//       비밀번호: '*'.repeat(data.password.length)
//     }, null, 2)}`);

//     try {
//       setError('');
//       console.log('회원가입 요청 시작...');
//       console.log('전송 데이터:', {
//         user_id: data.id,
//         name: data.name,
//         email: data.email,
//         password: '***' // 보안상 비밀번호는 로그에 표시하지 않음
//       });
      
//       // API 서비스 레이어를 통한 회원가입 요청
//       await signup({
//         user_id: data.id,
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       });

//       router.push('/?registered=true');
//     } catch (err: any) {
//       console.error('회원가입 오류:', err);
      
//       // 상세한 에러 메시지 처리
//       let errorMessage = '회원가입 처리 중 오류가 발생했습니다.';
      
//       if (err.response) {
//         // 서버가 응답을 반환한 경우 (4xx, 5xx 등)
//         const responseData = err.response.data;
//         console.log('오류 응답 데이터:', responseData);
//         console.log('오류 상태 코드:', err.response.status);
//         console.log('오류 헤더:', err.response.headers);
        
//         if (typeof responseData === 'object' && responseData.detail) {
//           errorMessage = responseData.detail;
//         } else if (typeof responseData === 'object' && responseData.error) {
//           errorMessage = responseData.error;
//         } else if (err.response.status === 422) {
//           errorMessage = '입력한 데이터 형식이 올바르지 않습니다. 필수 필드를 모두 입력했는지 확인해주세요.';
//         } else {
//           // 응답 데이터 형태에 따라 처리
//           if (typeof responseData === 'string') {
//             errorMessage = `회원가입 실패 (${err.response.status}): ${responseData.substring(0, 100)}...`;
//           } else {
//             try {
//               errorMessage = `회원가입 실패 (${err.response.status}): ${JSON.stringify(responseData)}`;
//             } catch (e) {
//               errorMessage = `회원가입 실패 (${err.response.status})`;
//             }
//           }
//         }
//       } else if (err.request) {
//         // 요청은 보냈지만 응답을 받지 못한 경우
//         console.log('응답 없음 - 요청 정보:', err.request);
//         errorMessage = '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.';
//       } else {
//         // 요청 준비 중 오류 발생
//         console.log('요청 설정 오류:', err.message);
//         errorMessage = `요청 설정 오류: ${err.message}`;
//       }
      
//       // 추가 디버깅 정보
//       if (err.config) {
//         console.log('요청 URL:', err.config.url);
//         console.log('요청 메서드:', err.config.method);
//         console.log('요청 헤더:', err.config.headers);
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     data,
//     error,
//     isLoading,
//     handleChange,
//     handleSubmit,
//     setData
//   };
// }; 