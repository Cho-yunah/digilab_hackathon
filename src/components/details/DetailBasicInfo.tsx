import React from 'react';

const DetailBasicInfo = () => {
  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">기본 정보</h2>
        <div className="flex items-center bg-stone-100 px-6 py-5 my-3 rounded-2xl">
          <div className="grid grid-cols-[100px_1fr] gap-y-2 gap-x-4 text-gray-800">
            <p className="font-bold">주소</p>
            <p>제주시 무슨로 무슨길 99 무슨건물 1층</p>

            <p className="font-bold">영업시간</p>
            <div>
              <p>매일 12:00 - 20:00</p>
              <p>매주 일요일 휴무</p>
            </div>

            <p className="font-bold">전화</p>
            <a href="tel:010-1234-5678" className="text-purple-500 underline">
              010-1234-5678
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
    </>
  );
};

export default DetailBasicInfo;
