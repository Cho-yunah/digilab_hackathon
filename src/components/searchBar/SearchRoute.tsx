import moreVertIcon from '@/assets/svg/more_vert.svg';
import locationIcon from '@/assets/svg/location.svg';
import flagIcon from '@/assets/svg/flag.svg';
import closeIcon from '@/assets/svg/close.svg';
import { useContext } from 'react';
import { LocationsContext } from '@/services/context';

type LocationPoint = {
  title: string;
  address: string;
  lat: number;
  lng: number;
};

const SearchRoute = ({ start, end }: { start: LocationPoint | null; end: LocationPoint | null }) => {
  const { setIsRouteSearchMode, setHeaderStatus, setRoutes } = useContext(LocationsContext);
  return (
    <>
      <div className="flex bg-white w-full p-4">
        <div className="w-6">
          <img src={locationIcon} alt="location" className="w-[24px] h-[24px]" />
          <img src={moreVertIcon} alt="more_vert" className="w-[24px] h-[24px]" />
          <img src={flagIcon} alt="flag" className="w-[24px] h-[24px]" />
        </div>
        <div className="w-2" />
        <div className="flex-1">
          <div className="flex">
            <input
              className="w-full mx-1 border border-solid border-1 rounded-md px-2 py-1 bg-white"
              value={start?.title}
              onChange={(e) => {
                console.log(e);
              }}
              onFocus={() => setIsRouteSearchMode(true)}
            />
          </div>
          <div className="h-2" />
          <div className="flex">
            <input
              className="w-full mx-1 border border-solid border-1 rounded-md px-2 py-1 bg-white"
              value={end?.title}
              onChange={(e) => {
                console.log(e);
              }}
              onFocus={() => setIsRouteSearchMode(true)}
            />
          </div>
        </div>
        <div className="w-2" />
        <div className="w-6">
          <img src={closeIcon} alt="close" className="w-[24px] h-[24px] cursor-pointer" onClick={() => {
            setHeaderStatus('map');
            setIsRouteSearchMode(false);
            setRoutes([]);
          }} />
        </div>
      </div>
    </>
  );
};

export default SearchRoute;
