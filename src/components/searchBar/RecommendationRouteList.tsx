import shoesIcon from '@/assets/svg/shoes.svg';
import wheelchairIcon from '@/assets/svg/wheelchair.svg';
import { cn } from '@/lib/utils';
import { LocationsContext } from '@/services/context';
import { useContext, useState } from 'react';

type Route = {
  name: '느린걸음' | '휠체어' | '목발';
  duration: number;
  distance: string;
  hint: string;
  coords: any[];
};

const getIcon = (name: Route['name']) => {
  if (name === '느린걸음') {
    return shoesIcon;
  }
  if (name === '휠체어') {
    return wheelchairIcon;
  }
  return shoesIcon;
};

const RecommendationRoute = ({ route, isActive, onClick }: { route: Route; isActive: boolean; onClick(): void }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg p-4 drop-shadow-lg cursor-pointer select-none border border-solid border-[2px] aspect-[140/115]',
        {
          'border-main': isActive,
        }
      )}
      onClick={() => onClick()}
    >
      <div className="flex justify-between">
        <div className={cn('text-sm', isActive ? 'text-main' : '')}>
          <span>{route.name}</span>
        </div>
        <div>
          <img src={getIcon(route.name)} alt={`icon of ${route.name}`} className="w-[24px] h-[24px]" />
        </div>
      </div>
      <div className="h-1" />
      <div className="flex items-end">
        <div className="text-2xl">
          <span>{route.duration}</span>
        </div>
        <div className="w-2" />
        <div>
          <span>{route.distance}</span>
        </div>
      </div>
      <div className="h-1" />
      <div className="text-sm">
        <span>{route.hint}</span>
      </div>
    </div>
  );
};

export const RecommendationRouteList = ({ routes, onClick }: { routes: Route[]; onClick(route: Route): void }) => {
  const [current, setCurrent] = useState(0);
  const { headerStatus } = useContext(LocationsContext);
  if (headerStatus !== 'route' || routes.length < 1) return <div></div>;
  return (
    <div className="grid gap-3 grid-cols-3 w-max">
      {routes.map((route, idx) => (
        <RecommendationRoute
          route={route}
          key={JSON.stringify(route)}
          isActive={idx === current}
          onClick={() => {
            setCurrent(idx);
            onClick(route);
          }}
        />
      ))}
    </div>
  );
};
