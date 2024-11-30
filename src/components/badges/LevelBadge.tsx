import React from 'react';

export const Levelbadge: { [key: string]: string } = {
  hard: '접근 어려움',
  base: '접근 일반',
  easy: '접근 쉬움',
};

const BadgeStyles: { [key: string]: { textColor: string; bgColor: string } } = {
  hard: { textColor: 'text-red-500', bgColor: 'bg-red-100' },
  base: { textColor: 'text-blue-500', bgColor: 'bg-blue-100' },
  easy: { textColor: 'text-yellow-500', bgColor: 'bg-yellow-100' },
};

const LevelBadge = ({ level }: { level: string }) => {
  const { textColor, bgColor } = BadgeStyles[level];
  return <div className={`p-1 text-xs font-semibold rounded-xl ${textColor} ${bgColor}`}>{Levelbadge[level]}</div>;
};

export default LevelBadge;
