import React from 'react';
import { FilterType, getIcon } from './filterTypes';

interface FilterButtonProps {
  filter: FilterType; // 버튼에 해당하는 필터 타입
  isSelected: boolean; // 선택 상태 여부
  onClick: (filter: FilterType) => void; // 클릭 이벤트 핸들러
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(filter)}
      className="flex items-center p-2 m-1 border-none rounded-full cursor-pointer shadow-lg text-[14px] "
      style={{
        backgroundColor: isSelected ? '#7a28ff' : '#fff',
        color: isSelected ? '#fff' : '#000',
        gap: '8px',
      }}
    >
      <img
        src={getIcon(filter)} // 아이콘 가져오기
        alt={`${filter} 아이콘`}
        style={{ width: '24px', height: '24px' }}
      />
      <span>{filter}</span>
    </button>
  );
};

export default FilterButton;
