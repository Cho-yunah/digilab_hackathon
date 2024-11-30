import React from 'react';
import Levelbadge from '../badges/Levelbadge';

const InfoCard = () => {
  return (
    <div className="absolute w-full bottom-5 flex justify-center ">
      <div className="w-96 rounded-xl bg-white z-30 shadow-lg overflow-hidden">
        <div className="absolute z-40 p-1 size-[36px] right-10 top-2 bg-white shadow-md rounded-full text-xl text-center">
          ✕
        </div>
        <div className="w-full h-50 m-0 bg-violet-200">
          <div className="absolute top-5 left-10 ">
            <Levelbadge level={'hard'} />
          </div>
          <img src="https://via.placeholder.com/150" alt="info-card" />
        </div>
        <div className="flex flex-col p-2">
          <h2 className="text-lg font-semibold">제주 서귀포 식당</h2>
          <div className="flex gap-1 items-center">
            <p className="text-sm text-[#7C7C7F]">음식점 •</p>

            <p className="text-xs text-[#7C7C7F]">{`000`}m</p>
          </div>
          <div className="flex justify-between p-1">
            <div className="flex gap-3">
              <img src="https://via.placeholder.com/50" alt="icon" />
              <img src="https://via.placeholder.com/50" alt="icon" />
            </div>
            <div className="flex gap-2 items-center">
              <button className="h-[36px] w-[60px] rounded-full border-[1px] text-sm border-main text-main">
                출발
              </button>
              <button className="h-[36px] w-[60px] rounded-full text-sm text-white bg-main">도착</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
