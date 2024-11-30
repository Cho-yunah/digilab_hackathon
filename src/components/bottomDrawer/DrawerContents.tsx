import React from 'react';
import logo from '@/assets/svg/digilab.svg';
import Selector from '../select/Select';

const DrawerContents = () => {
  const imageUrl = '';
  return (
    <div>
      <Selector />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-between py-2 w-[90%] max-w-md">
            <div className="w-full aspect-[2/1] bg-violet-200 rounded-lg flex items-center justify-center">
              <img src={imageUrl !== '' ? imageUrl : logo} alt="매장 이미지" className="rounded-lg" />
            </div>
            <div className="flex items-baseline w-full">
              <p className="text-lg font-semibold m-1">매장 이름</p>
              <p className="text-sm text-[#7C7C7F] font-bold m-1">{`000`} m</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawerContents;
