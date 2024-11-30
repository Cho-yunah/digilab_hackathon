import React from 'react';

export const LevelbadgeString: { [key: string]: string } = {
  difficult: '접근 어려움',
  normal: '접근 일반',
  easy: '접근 쉬움',
};

const BadgeStyles: { [key: string]: { textColor: string; bgColor: string } } = {
  difficult: { textColor: 'text-red-500', bgColor: 'bg-red-100' },
  normal: { textColor: 'text-blue-500', bgColor: 'bg-blue-100' },
  easy: { textColor: 'text-orange-500', bgColor: 'bg-orange-100' },
};

const LevelBadge = (level: { level: string }) => {
  const textColor = level.level ? BadgeStyles[level.level].textColor : 'text-blue-500';
  const bgColor = level.level ? BadgeStyles[level.level].bgColor : 'bg-blue-100';
  return (
    <div className={`py-1 px-2 text-xs font-semibold rounded-xl ${textColor} ${bgColor}`}>
      {LevelbadgeString[level.level]}
    </div>
  );
};

export default LevelBadge;
