import TablerBedIcon from '@assets/icons/tabler_bed.svg';
import BowlSpoonIcon from '@assets/icons/tabler_bowl-spoon.svg';
import BankBuildingIcon from '@assets/icons/tabler_building-bank.svg';

// 1. 필터 타입을 enum으로 정의
export enum FilterType {
  Restaurant = '음식점',
  Accommodation = '숙박',
  ConvenienceStore = '편의점',
  // 필요한 필터 추가
}

// 2. 아이콘 매핑 객체 생성
const iconMap: Record<FilterType, string> = {
  [FilterType.Restaurant]: BowlSpoonIcon,
  [FilterType.Accommodation]: TablerBedIcon,
  [FilterType.ConvenienceStore]: BankBuildingIcon,
  // 필터별 아이콘 경로 매핑
};

// 3. 아이콘을 반환하는 함수
export const getIcon = (filterType: FilterType): string => {
  console.log(iconMap[filterType]);
  return iconMap[filterType];
};

// 사용 예제
const filterType: FilterType = FilterType.Restaurant;
const iconPath = getIcon(filterType);
console.log(iconPath); // '/icons/restaurant.png'
