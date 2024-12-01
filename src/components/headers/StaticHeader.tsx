import back_arrow from '@/assets/svg/back_arrow.svg';
import { LocationsContext } from '@/services/context';
import { useContext } from 'react';

const StaticHeader = ({ title }: { title: string }) => {
  const { setHeaderStatus } = useContext(LocationsContext);

  return (
    <div className="w-full h-[56px] border-b-[1px] bg-white ">
      <div className="text-2xl font-bold p-3 flex items-center text-lg">
        <button onClick={() => setHeaderStatus('map')} className="p-1 m-0 bg-white">
          <img src={back_arrow} alt="info-card" className="m-1 cursor-pointer" />
        </button>
        <p className="text-lg ml-1">{title}</p>
      </div>
    </div>
  );
};

export default StaticHeader;
