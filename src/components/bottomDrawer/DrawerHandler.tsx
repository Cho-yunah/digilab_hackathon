import { useState } from 'react';

const DrawerHandler = () => {
  return (
    <div className="w-full h-3 flex justify-center items-center cursor-pointer">
      <div className="w-16 h-2 bg-gray-300 rounded-full" onMouseDown={startDrag} />
    </div>
  );
};

export default DrawerHandler;
