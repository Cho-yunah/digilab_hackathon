import React, { useRef, useState } from 'react';
import { Drawer, Button } from 'antd';
import Map from '@components/map/Map';
import SearchBar from '@components/searchBar/SearchBar';

const HomePage = () => {
  const [drawerHeight, setDrawerHeight] = useState('0%');
  // const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Map />
      <SearchBar />
      {/* <Button type="primary" onClick={() => setDrawerHeight('80%')}>
        Open Drawer
      </Button>
      <Drawer
        title="Drawer in Container"
        placement="bottom"
        closable={false}
        open
        getContainer={false} // 특정 DOM 요소
        mask={false}
        height={drawerHeight}
      >
        <p>Drawer Content</p>
      </Drawer> */}
    </div>
  );
};

export default HomePage;
