import moreVertIcon from '@/assets/svg/more_vert.svg';
import locationIcon from '@/assets/svg/location.svg';
import flagIcon from '@/assets/svg/flag.svg';
import closeIcon from '@/assets/svg/close.svg';


type LocationPoint = {
  title: string;
  address: string;
  lat: number;
  lng: number;
}


const SearchRoute = ({ start, end }: { start: LocationPoint | null, end: LocationPoint | null }) => {
  return (
    <div className="flex bg-white w-full p-4">
      <div className="w-6">
        <img src={locationIcon} alt="location" className="w-[24px] h-[24px]" />
        <img src={moreVertIcon} alt="more_vert" className="w-[24px] h-[24px]" />
        <img src={flagIcon} alt="flag" className="w-[24px] h-[24px]" />
      </div>
      <div className='w-2' />
      <div className="flex-1">
        <div className='flex'>
          <span className="w-full mx-1 border border-solid border-1 rounded-md px-2 py-1" contentEditable>{start?.title}</span>
        </div>
        <div className='h-2' />
        <div className='flex'>
          <span className="w-full mx-1 border border-solid border-1 rounded-md px-2 py-1" contentEditable>{end?.title}</span>
        </div>
      </div>
      <div className='w-2' />
      <div className="w-6">
        <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default SearchRoute;
