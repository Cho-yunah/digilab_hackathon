import React, { useState } from 'react';
import Map from '@/components/map/Map';
import SearchBar from '@/components/searchBar/SearchBar';
import FilterButtonBox from '@/components/filter/FilterButtonBox';

const HomePage = () => {
  const [drawerHeight, setDrawerHeight] = useState('0%');
  const openDrawer = () => setDrawerHeight('60%');

  return (
    <div className="relative">
      <Map />
      <SearchBar />
      <FilterButtonBox />
      <button onClick={openDrawer}>Open Drawer</button>
    </div>
  );
};

export default HomePage;
