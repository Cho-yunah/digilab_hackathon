import { useState } from 'react';
import {Map} from '@/components/map/Map';

const HomePage = () => {
  const [drawerHeight, setDrawerHeight] = useState('0%');
  const openDrawer = () => setDrawerHeight('60%');

  return (
    <div className="relative">
      <Map />
      <button onClick={openDrawer}>Open Drawer</button>
    </div>
  );
};

export default HomePage;
