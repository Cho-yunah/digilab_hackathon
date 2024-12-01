import React, { useContext, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './BottomSheet.css'; // 스타일은 아래에 추가
import Selector from '../select/Select';
import { SearchResultCard, SearchResultCardList } from '../searchBar/SearchResultCard';
import { LocationsContext } from '@/services/context';
import { useNavigate } from 'react-router-dom';
import FilterButtonBox from '../filter/FilterButtonBox';
import filter_icon from '@/assets/svg/filter_icon.svg';

const minY = 0;

interface BottomSheetProps {
  initialHeight?: number; // 초기 높이
  snapPoints?: number[]; // 스냅 포인트
}

const BottomSheet: React.FC<BottomSheetProps> = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { sites, headerStatus } = useContext(LocationsContext);

  const [style, api] = useSpring(() => ({
    height: minY,
    config: { tension: 200, friction: 30 },
  }));

  // 특정 위치로 이동하는 함수
  const moveTo = (position: number) => {
    api.start({ height: position });
  };

  const bind = useDrag(({ delta: [, dy], down }) => {
    const rect = sheetRef.current?.getBoundingClientRect();
    api.start({ height: (rect?.height || minY) - dy, immediate: down });
  });

  useEffect(() => {
    if (headerStatus !== 'search') {
      moveTo(0);
      return;
    }
    moveTo(window.innerHeight * 0.7);
  }, [headerStatus, sites]);

  return (
    <animated.div
      ref={sheetRef}
      className="bottom-sheet"
      style={{
        minWidth: '348px',
        maxWidth: '448px',
        margin: '0 auto',
        height: style.height.to((h) => h),
      }}
    >
      <div className="bottom-sheet-header" {...bind()}>
        <div className="handler" />
      </div>
      <div className="bottom-sheet-content">
        <Selector />
        <div className="flex">
          <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
            <img src={filter_icon} alt="filterIcon" className="w-5 h-5" />
            <span className="text-sm text-gray-600">필터</span>
          </div>
          <FilterButtonBox />
        </div>
        <SearchResultCardList>
          {sites.map((site: any) => (
            <SearchResultCard
              key={JSON.stringify(site)}
              data={site}
              onClick={() => {
                // alert('페이지 이동');
                navigate(`/${site.id}`, {
                  state: { ...site },
                });
              }}
            />
          ))}
          {sites.length < 1 && (
            <div>
              <span>검색 결과가 없습니다.</span>
            </div>
          )}
        </SearchResultCardList>
      </div>
      <div className="bottom-sheet-footer"></div>
    </animated.div>
  );
};

export default BottomSheet;
