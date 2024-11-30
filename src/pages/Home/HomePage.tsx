import React, { useState } from 'react';
import SearchBar from '@/components/searchBar/SearchBar';
import FilterButtonBox from '@/components/filter/FilterButtonBox';
import InfoCard from '@/components/infoCard/InfoCard';
import { Map } from '@/components/map/Map';
import CategoryButtonBox from '@/components/filter/CategoryButtonBox';
import { Filter } from 'lucide-react';

const HomePage = () => {
  const [drawerHeight, setDrawerHeight] = useState('0%');
  const openDrawer = () => setDrawerHeight('60%');

  return (
    <div className="relative">
      <Map />
      {/* <CategoryButtonBox /> */}
      <FilterButtonBox />

      <InfoCard />
      <button onClick={openDrawer}>Open Drawer</button>
    </div>
  );
};

export default HomePage;
