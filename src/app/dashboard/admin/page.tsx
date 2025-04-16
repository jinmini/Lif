import { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 대시보드 - LIF",
  description: "Life, Intelligence, Future - 관리자 대시보드"
};

export default function AdminDashboardPage() {
  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
        
        <div className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15">
          <div className="mb-8 flex items-center justify-between border-b border-stroke pb-5 dark:border-strokedark">
            <div>
              <h2 className="text-3xl font-semibold text-black dark:text-white">관리자 대시보드</h2>
              <p className="mt-1 text-base text-waterloo dark:text-manatee">LIF 관리자 전용 대시보드입니다.</p>
            </div>
          </div>
          
          {/* 사용자 관리 섹션 */}
          <div className="mb-8 rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              사용자 관리
            </h4>
            
            <div className="flex flex-col">
              <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    ID
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    이름
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    역할
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    관리
                  </h5>
                </div>
              </div>
              
              <div className="grid grid-cols-4 border-b border-stroke dark:border-strokedark">
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">001</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">김진민</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    구독자
                  </span>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <button className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90">
                    수정
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 border-b border-stroke dark:border-strokedark">
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">002</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">홍길동</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                    일반
                  </span>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <button className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90">
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 데이터 관리 섹션 */}
          <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              데이터 등록/수정
            </h4>
            
            <div className="mb-4">
              <button className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90">
                새 데이터 등록
              </button>
            </div>
            
            <p className="text-waterloo dark:text-manatee">
              이 섹션에는 추후 데이터 등록 및 수정 UI가 추가될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
