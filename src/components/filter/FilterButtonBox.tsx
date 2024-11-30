import React, { useState } from 'react';
import FilterButton from './FilterButton'; // 단일 버튼 컴포넌트
import { FilterType } from './filterTypes'; // 필터 타입

const FilterButtonBox: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter((prev) => (prev === filter ? null : filter)); // 동일 필터 클릭 시 선택 해제
  };

  return (
    <div className="flex flex-wrap mt-2">
      {Object.values(FilterType).map((filter) => (
        <FilterButton key={filter} filter={filter} isSelected={selectedFilter === filter} onClick={handleFilterClick} />
      ))}
    </div>
  );
};

export default FilterButtonBox;
