import React from 'react';
import review_img from '@/assets/img/review_img.png';

const DetailBasicInfo = ({ state }: any) => {
  const { address, schedule, phone } = state;

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">기본 정보</h2>
        <div className="flex items-center bg-stone-100 px-6 py-5 my-3 rounded-2xl">
          <div className="grid grid-cols-[100px_1fr] gap-y-2 gap-x-4 text-gray-800">
            <p className="font-bold">주소</p>
            <p>{address}</p>

            <p className="font-bold">영업시간</p>
            <div>
              <p>{schedule}</p>
            </div>

            <p className="font-bold">전화</p>
            <a href="tel:phone" className="text-purple-500 underline">
              {phone}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
      <div className="p-3">
        <img src={review_img} alt="review image" />
      </div>
    </>
  );
};

export default DetailBasicInfo;
