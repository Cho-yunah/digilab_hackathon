import React, { useContext, useState } from 'react';
import IconButton from './IconButton'; // 단일 버튼 컴포넌트
import { CategoryType, getCategoryIcon } from './filterTypes'; // 필터 타입
import { LocationsContext } from '@/services/context';


const maps = {
  '음식점': 'restaurant',
  '관광지': 'tour',
  '숙박': 'accommodation',
}
const CategoryButtonBox: React.FC = () => {
  const { search, setSearchText } = useContext(LocationsContext);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory((prev) => {
      if (prev === category) {
        search({ category: undefined });
        return null;
      }
      search({ category: maps[category] });
      setSearchText(category);
      return category;
    }); // 동일 필터 클릭 시 선택 해제
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
