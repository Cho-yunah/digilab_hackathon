import { useContext } from 'react';
import LevelBadge from '../badges/LevelBadge';
import { LocationsContext } from '@/services/context';

import { useNavigate } from 'react-router-dom';

import ic_lift from '@/assets/svg/ic_lift.svg';
import ic_parking from '@/assets/svg/ic_parkinglot.svg';
import ic_table from '@/assets/svg/ic_table.svg';
import ic_toilet from '@/assets/svg/ic_toilet.svg';
import degree_high from '@/assets/svg/degree_high.svg';
import degree_low from '@/assets/svg/degree_low.svg';
import degree_mid from '@/assets/svg/degree_middle.svg';

interface IconBoxProps {
  degree: string;
  parking: number;
  bathroom: number;
  elevator: number;
  table: number;
}

const LEVEL: { [key: string]: any } = {
  상: 'difficult',
  중: 'normal',
  하: 'easy',
};

const DEGREE: { [key: string]: string } = {
  0: degree_high,
  1: degree_mid,
  2: degree_low,
};

const CATEGORY: { [key: string]: string } = {
  restaurant: '음식점',
  tour: '관광지',
  accommodation: '숙박',
};

const IconBox = ({ degree, parking, bathroom, elevator, table }: IconBoxProps) => {
  return (
    <div className="flex gap-2">
      {degree !== '0' && <img src={degree} alt="icon" />}
      {parking != 0 && <img src={ic_parking} alt="icon" />}
      {bathroom != 0 && <img src={ic_toilet} alt="icon" />}
      {elevator != 0 && <img src={ic_lift} alt="icon" />}
      {table != 0 && <img src={ic_table} alt="icon" />}
    </div>
  );
};

const InfoCard = ({ data, onClose }: { data: any; onClose(): void }) => {
  const { setRoutePoints, setHeaderStatus, findRoute } = useContext(LocationsContext);
  const navigate = useNavigate();
  if (!data) return <></>;
  console.log(data);

  const level = LEVEL[data['접근성']];
  const degree = DEGREE[data['경사']];
  const [parking, bathroom, elevator, table] = [data['주차장'], data['화장실'], data['승강기'], data['테이블']];
  // console.log(parking, bathroom, elevator, table);
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
            <LevelBadge level={level} />
          </div>
          <img src={data.thumb} alt="info-card" />
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-baseline">
            <h2 className="text-lg font-semibold ">{data.title}</h2>
            <p className="text-sm text-[#7C7C7F] ml-2 font-semibold">{CATEGORY[data.cat]}</p>
          </div>
          <div className="gap-1 items-center">
            <p className="text-xs text-[#7C7C7F]">{data.address}</p>

            {/* <p className="text-xs text-[#7C7C7F]">{data.distance}m</p> */}
          </div>
          <div className="flex justify-between p-1 mt-2">
            <IconBox {...{ degree, parking, bathroom, elevator, table }} />
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
                  findRoute(locData);
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
