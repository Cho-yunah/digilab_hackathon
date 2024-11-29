import React from 'react';
import logo from '@assets/svg/digilab.svg';

const SearchBar = () => {
  return (
    <div className="m-5 w-[90%] absolute top-2 flex">
      <div className="w-full h-[40px] p-2 shadow-md rounded-full bg-white flex">
        <img src={logo} className="mx-2" />
        <input className="w-full mx-1" />
      </div>
    </div>
  );
};

export default SearchBar;
