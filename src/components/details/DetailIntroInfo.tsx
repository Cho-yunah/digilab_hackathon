import React from 'react';
import { useNavigate } from 'react-router-dom';
import location from '@/assets/svg/location.svg';
import flag from '@/assets/svg/flag_white.svg';
import back_arrow from '@/assets/svg/back_arrow.svg';

export enum CATEGORY {
  accommodation = '숙박',
  restaurant = '음식점',
  tour = '관광지',
}

const DetailIntroInfo = ({ state }: any) => {
  const navigate = useNavigate();
  const { thumb, title, cat } = state;
  const category = CATEGORY[cat as keyof typeof CATEGORY];

  const handleGoBack = () => {
    navigate(-1); // 뒤로가기
  };
  return (
    <>
      <div className="w-full bg-violet-200 h-[200px] overflow-hidden object-fit relative">
        <img src={thumb} alt="info-card" />
        <button
          onClick={handleGoBack}
          className="p-0 m-0 bg-white shadow-md rounded-full size-[36px] absolute top-4 left-4"
        >
          <img src={back_arrow} alt="info-card" className="m-1 cursor-pointer" />
        </button>
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
