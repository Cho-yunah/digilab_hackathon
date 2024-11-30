import { useContext } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SearchRoute from '../searchBar/SearchRoute';
import { LocationsContext } from '@/services/context';
import StaticHeader from '../headers/StaticHeader';
import CategoryButtonBox from '../filter/CategoryButtonBox';

export function MapHeader() {
  const { routePoints, headerStatus, searchText } = useContext(LocationsContext);
  return (
    <>
      {headerStatus === 'map' && (
        <div className="absolute my-1 p-3 top-0 left-0 w-full">
          <SearchBar />
          <CategoryButtonBox />
        </div>
      )}
      {headerStatus === 'search' && (
        <div className="absolute top-0 left-0 w-full">
          <StaticHeader title={searchText} />
        </div>
      )}
      {headerStatus === 'route' && (
        <div className="absolute top-0 left-0 w-full">
          <SearchRoute start={routePoints[0]} end={routePoints[1]} />
        </div>
      )}
    </>
  );
}
