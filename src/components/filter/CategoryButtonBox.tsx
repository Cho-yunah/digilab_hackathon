import React, { useState } from 'react';
import IconButton from './IconButton'; // 단일 버튼 컴포넌트
import { CategoryType, getCategoryIcon } from './filterTypes'; // 필터 타입

const CategoryButtonBox: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory((prev) => (prev === category ? null : category)); // 동일 필터 클릭 시 선택 해제
  };

  return (
    <div className="flex flex-wrap mt-2">
      {Object.values(CategoryType).map((category) => (
        <IconButton
          key={category}
          filter={category}
          isSelected={selectedCategory === category}
          onClick={handleCategoryClick}
          getIcon={getCategoryIcon}
        />
      ))}
    </div>
  );
};

export default CategoryButtonBox;
