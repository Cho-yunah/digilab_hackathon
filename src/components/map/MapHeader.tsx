import { useContext } from 'react';
import FilterButtonBox from '../filter/FilterButtonBox';
import SearchBar from '../searchBar/SearchBar';
import SearchRoute from '../searchBar/SearchRoute';
import { LocationsContext } from '@/services/context';
import StaticHeader from '../headers/StaticHeader';

export function MapHeader() {
  const { routePoints, headerStatus, searchText } = useContext(LocationsContext);
  return (
    <>
      {headerStatus === 'map' && (
        <div className="absolute p-2 top-0 left-0 w-full z-[2000]">
          <SearchBar />
          <FilterButtonBox />
        </div>
      )}
      {headerStatus === 'search' && (
        <div className="absolute top-0 left-0 w-full z-[2000]">
            <StaticHeader title={searchText} />
        </div>
      )}
      {headerStatus === 'route' && (
        <div className="absolute top-0 left-0 w-full z-[2000]">
          <SearchRoute start={routePoints[0]} end={routePoints[1]} />
        </div>
      )}
    </>
  );
}
