import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './BottomSheet.css'; // 스타일은 아래에 추가

const minY = 300;

interface BottomSheetProps {
  initialHeight?: number; // 초기 높이
  snapPoints?: number[]; // 스냅 포인트
}

const BottomSheet: React.FC<BottomSheetProps> = () => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const [style, api] = useSpring(() => ({
    height: minY,
    config: { tension: 200, friction: 30 },
  }));

  // 특정 위치로 이동하는 함수
  const moveTo = (position: number) => {
    api.start({ height: position });
  };

  const bind = useDrag(({ delta: [,dy], down }) => {
    const rect = sheetRef.current?.getBoundingClientRect();
    api.start({ height: (rect?.height || minY) - dy, immediate: down });
  });

  return (
    <animated.div
      ref={sheetRef}
      className="bottom-sheet min-h-[300px]"
      style={{
        height: style.height.to((h) => h),
      }}
    >
      <div className="bottom-sheet-header" {...bind()}>
        <div className="handler" />
      </div>
      <div className="bottom-sheet-content">
        <p>여기에 원하는 내용을 추가하세요. 내용이 길어지면 스크롤됩니다.</p>
        <p>스크롤 가능한 콘텐츠</p>
        <p>더 많은 콘텐츠...</p>
      </div>
      <div className="bottom-sheet-footer">
        <button onClick={() => moveTo(100)}>최소화</button>
        <button onClick={() => moveTo(300)}>중간</button>
        <button onClick={() => moveTo(500)}>최대화</button>
      </div>
    </animated.div>
  );
};

export default BottomSheet;
