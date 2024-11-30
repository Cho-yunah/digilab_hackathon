export const LevelbadgeString: { [key: string]: string } = {
  difficult: '접근 어려움',
  normal: '접근 보통',
  easy: '접근 쉬움',
};

const BadgeStyles: { [key: string]: { textColor: string; bgColor: string } } = {
  difficult: { textColor: 'text-[#F22A2A]', bgColor: 'bg-[#FFE0E0]' },
  normal: { textColor: 'text-[#F07400]', bgColor: 'bg-[#FFE6C4]' },
  easy: { textColor: 'text-[#00AE3A]', bgColor: 'bg-[#E4FFED]' },
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
