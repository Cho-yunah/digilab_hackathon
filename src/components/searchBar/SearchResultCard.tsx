import logo from '@/assets/svg/digilab.svg';
import React from 'react';


export type Site = {
  thumb: string;
  title: string;
  distance: number;
}

export const SearchResultCard = ({ data, onClick }: { data: Site, onClick(d: Site): void }) => {
  return (
    <div className="flex flex-col items-center justify-between py-2 w-[90%] max-w-md" onClick={() => onClick(data)}>
      <div className="w-full aspect-[343/166] overflow-hidden bg-violet-200 rounded-lg flex items-center justify-center">
        <img src={data.thumb !== '' ? data.thumb : logo} alt="매장 이미지" className="rounded-lg" />
      </div>
      <div className="flex items-baseline w-full">
        <p className="text-lg font-semibold m-1 text-black">{data.title}</p>
        <p className="text-sm text-[#7C7C7F] font-bold m-1">{(data.distance ?? 0) * 1000} m</p>
      </div>
    </div>
  );
};

export const SearchResultCardList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {children}
    </div>
  )
}
