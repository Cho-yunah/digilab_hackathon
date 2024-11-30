import React from 'react';

const DetailIntroInfo = () => {
  return (
    <>
      <div className="w-full bg-violet-200 h-[150px]">
        {/* <img src="https://via.placeholder.com/150" alt="info-card" /> */}
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-lg font-semibold">제주 서귀포 식당</h1>
        <div className="flex gap-1 items-center">
          <p className="text-sm text-[#7C7C7F]">음식점 •</p>
          <p className="text-xs text-[#7C7C7F]">{`000`}m</p>
        </div>
        <div className="flex gap-5 items-center m-5 justify-center">
          <button className="flex h-[36px] w-[96px] gap-2 rounded-full border-[1px] text-sm border-main text-main">
            <img src="https://via.placeholder.com/20" alt="icon" />
            <p>출발</p>
          </button>
          <button className="flex h-[36px] w-[96px] gap-2 rounded-full text-sm text-white bg-main">
            <img src="https://via.placeholder.com/20" alt="icon" />
            <p>도착</p>
          </button>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
    </>
  );
};

export default DetailIntroInfo;
