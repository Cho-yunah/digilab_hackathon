import React from 'react';
import location from '@/assets/svg/location.svg';
import flag from '@/assets/svg/flag_white.svg';

export enum CATEGORY {
  accommodation = '숙박',
  restaurant = '음식점',
  tour = '관광지',
}

const DetailIntroInfo = ({ state }: any) => {
  console.log(state);
  const { thumbnails, title, cat } = state;
  const category = CATEGORY[cat as keyof typeof CATEGORY];
  return (
    <>
      <div className="w-full bg-violet-200 h-[200px] overflow-hidden object-fit">
        <img src={thumbnails} alt="info-card" />
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex gap-1 items-center">
          <p className="text-base text-[#7C7C7F]">{category} </p>
          {/* <p className="text-xs text-[#7C7C7F]">{`000`}m</p> */}
        </div>
        <div className="flex gap-5 items-center m-5 justify-center">
          <button className="flex h-[36px] w-[96px] gap-2 rounded-full border-main border-2 text-sm text-main bg-white">
            <img src={location} alt="icon" />
            <p className="">출발</p>
          </button>
          <button className="flex h-[36px] w-[96px] gap-2 rounded-full text-sm text-white bg-main">
            <img src={flag} alt="icon" />
            <p>도착</p>
          </button>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
    </>
  );
};

export default DetailIntroInfo;
