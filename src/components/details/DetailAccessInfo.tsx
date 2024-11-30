import React from 'react';

const DetailAccessInfo = () => {
  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">접근성 정보</h2>
        <div className="flex items-center bg-stone-100 p-2 rounded-xl">
          <div className="flex flex-col p-3 text-center">
            <img src="https://via.placeholder.com/60" alt="info-card" />
            <p className="font-semibold text-lg text-red-500">보통</p>
          </div>
          <p className="text-sm">일부 접근성 조건이 충족되어 있으나, 이용에 약간의 불편함이 있을수 있습니다..</p>
        </div>
        <div className="px-1 py-3">
          <h3 className="font-semibold">공간 접근성</h3>
          <div className="grid grid-cols-2 grid-flow-row gap-5 py-2">
            <div className="flex items-center gap-3 text-base text-[#171719]">
              <img src="https://via.placeholder.com/20" alt="icon" />
              <p>도움 필요 중</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://via.placeholder.com/20" alt="icon" />
              <p>장애인 주차장</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://via.placeholder.com/20" alt="icon" />
              <p>장애인 화장실</p>
            </div>
          </div>
          <button className="w-full bg-white rounded-xl mt-4 p-2 border-[#7c7c7f]">{`편의시설 ${'5'}개 더보기 ❯`}</button>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
    </>
  );
};

export default DetailAccessInfo;
