import React, { useState } from 'react';
import IconButton from './IconButton'; // 단일 버튼 컴포넌트
import { FilterType, getFilterIcon } from './filterTypes'; // 필터 타입

const FilterButtonBox: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter)); // 동일 필터 클릭 시 선택 해제
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex items-center gap-1 w-max px-1">
        {Object.values(FilterType).map((filter) => (
          <IconButton
            key={filter}
            filter={filter}
            isSelected={selectedFilter === filter}
            onClick={handleFilterClick}
            getIcon={getFilterIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterButtonBox;
