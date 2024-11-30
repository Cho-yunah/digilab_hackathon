import React from 'react';
import { CategoryType, FilterType, IconState } from './filterTypes';

interface IconButtonProps {
  filter: CategoryType | FilterType;
  isSelected: boolean;
  onClick: (filter: any) => void;
  getIcon: (filter: any, state: IconState) => string;
}

const IconButton: React.FC<IconButtonProps> = ({ filter, isSelected, onClick, getIcon }) => {
  const iconSrc = getIcon(filter, isSelected ? IconState.ACTIVE : IconState.DEFAULT);

  return (
    <button
      onClick={() => onClick(filter)}
      className="flex items-center p-2 m-1 rounded-full cursor-pointer text-[14px] shadow-md"
      style={{
        backgroundColor: isSelected ? '#F6F2FF' : '#fff',
        border: isSelected ? '1px solid #7A28FF' : '1px solid #cdcdcd',
        color: isSelected ? '#7A28FF' : '#000',
        gap: '8px',
      }}
    >
      <img src={iconSrc} alt={`${filter} 아이콘`} className="w-6 h-6" />
      <span>{filter}</span>
    </button>
  );
};

export default IconButton;
