import logo from '@/assets/svg/digilab.svg';
import { LocationsContext } from '@/services/context';
import { useContext } from 'react';

const SearchBar = () => {
  const { searchText, search, setSearchText, setHeaderStatus } = useContext(LocationsContext);
  return (
    <div className="w-full flex">
      <div className="w-full h-[40px] p-2 shadow-md rounded-full bg-white flex">
        <img
          src={logo}
          className="mx-2 cursor-pointer"
          onClick={() => {
            setHeaderStatus('map');
          }}
        />
        <input
          className="w-full mx-1 bg-white"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              search({ title: searchText });
              setHeaderStatus('search');
            }
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
