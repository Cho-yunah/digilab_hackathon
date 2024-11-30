import React, { useState } from 'react';

interface CustomDrawerProps {
  open: boolean; // Drawer 열림 상태
  onClose: () => void; // 닫기 핸들러
}

const BottomDrawer: React.FC<CustomDrawerProps> = ({ }) => {
  const [drawerHeight, setDrawerHeight] = useState(60); // 초기 높이 (%)
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(event.clientY); // 드래그 시작 위치
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = startY - event.clientY; // 드래그 이동 거리
    let newHeight = drawerHeight + (deltaY / window.innerHeight) * 100;

    // 높이 제한
    if (newHeight < 20) newHeight = 20;
    if (newHeight > 100) newHeight = 100;

    setDrawerHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // 스냅 동작
    if (drawerHeight > 80) {
      setDrawerHeight(100);
    } else {
      setDrawerHeight(60);
    }

    // 이벤트 리스너 제거
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const startDrag = (event: React.MouseEvent) => {
    handleMouseDown(event);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    // <Drawer
    //   title={
    //     <DrawerHandler
    //       drawerHeight={drawerHeight}
    //       setDrawerHeight={setDrawerHeight}
    //       startY={startY}
    //       setStartY={setStartY}
    //     />
    //   }
    //   placement="bottom"
    //   closable={false}
    //   open
    //   getContainer={false} // 특정 DOM 요소
    //   mask={false}
    //   height={drawerHeight}
    // >
    //   <p>Drawer Contddddent</p>
    //   <DrawerContents />
    // </Drawer>
  )
};

export default BottomDrawer;
