import { LocationsContext } from '@/services/context';
import { useContext } from 'react';
import mapPinIcon from '@/assets/svg/map_pin.svg';

export const SearchList = () => {
  const { sites } = useContext(LocationsContext);
  return (
    <div className="flex flex-col">
      <hr />
      {sites.map((site: any) => (
        <div
          key={JSON.stringify(site)}
          className="flex h-12 items-center justify-between border-b-1 border-b border-b-solid px-2 pr-4 cursor-pointer hover:bg-gray-300"
          onClick={() => {
            console.log(site);
          }}
        >
          <div className="flex">
            <img src={mapPinIcon} alt="icon" />
            <div className="w-2" />
            <div className="text-black">{site.title}</div>
          </div>
          <div>{site.distance}m</div>
        </div>
      ))}
    </div>
  );
};
