import { useContext } from 'react';
import Levelbadge from '../badges/LevelBadge';
import { LocationsContext } from '@/services/context';
import { useNavigate } from 'react-router-dom';

const InfoCard = ({ data, onClose }: { data: any; onClose(): void }) => {
  const { setCurrentToDestination, setRoutePoints, setHeaderStatus } = useContext(LocationsContext);
  const navigate = useNavigate();

  if (!data) return <></>;
  const locData = { title: data.title, lat: data.lat, lng: data.lon, address: data.address };

  const handleClickCard = () => {
    navigate(`/${data.id}`, {
      state: { ...data },
    });
  };
  return (
    <div onClick={handleClickCard} className="relative w-full bottom-5 flex justify-center rounded-xl">
      <div className="w-96 rounded-xl bg-white z-30 shadow-lg overflow-hidden">
        <div
          onClick={(e) => (e.stopPropagation(), onClose())}
          className="absolute z-40 p-1 size-[36px] right-10 top-2 bg-white shadow-md rounded-full text-xl text-center cursor-pointer select-none"
        >
          ✕
        </div>
        <div className="w-full h-50 m-0 bg-violet-200 aspect-[343/143] overflow-hidden">
          <div className="absolute top-5 left-10 ">
            <Levelbadge level={'hard'} />
          </div>
          <img src={data.thumb} alt="info-card" />
        </div>
        <div className="flex flex-col p-2">
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <div className="flex gap-1 items-center">
            <p className="text-sm text-[#7C7C7F]">{data.cat}</p>

            <p className="text-xs text-[#7C7C7F]">{data.distance}m</p>
          </div>
          <div className="flex justify-between p-1">
            <div className="flex gap-3">
              <img src="https://via.placeholder.com/50" alt="icon" />
              <img src="https://via.placeholder.com/50" alt="icon" />
            </div>
            <div className="flex gap-2 items-center">
              <button
                className="h-[36px] w-[60px] rounded-full border-[1px] text-sm border-main text-main"
                onClick={(e) => {
                  e.stopPropagation();
                  setRoutePoints([locData, null]);
                  setHeaderStatus('route');
                  onClose();
                }}
              >
                출발
              </button>
              <button
                className="h-[36px] w-[60px] rounded-full text-sm text-white bg-main"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentToDestination(locData);
                  onClose();
                }}
              >
                도착
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
