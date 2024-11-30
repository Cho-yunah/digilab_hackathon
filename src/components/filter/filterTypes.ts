import categoryBedIcon from '@/assets/svg/category_bed.svg';
import categoryBowlIcon from '@/assets/svg/category_bowl.svg';
import categoryBuildingIcon from '@/assets/svg/category_building.svg';

import filterMobility from '@/assets/svg/filter_mobility.svg';
import filterBlind from '@/assets/svg/filter_blind.svg';
import filterDeaf from '@/assets/svg/filter_deaf.svg';
import filterInfant from '@/assets/svg/filter_infant.svg';

// 1. 카테고리 타입을 enum으로 정의
export enum CategoryType {
  TOUR = '관광지',
  RESTAURANT = '음식점',
  ACCOMMODATION = '숙박',
}

// 2. 아이콘 매핑 객체 생성
const categoryIconMap: Record<CategoryType, string> = {
  [CategoryType.TOUR]: categoryBuildingIcon,
  [CategoryType.RESTAURANT]: categoryBowlIcon,
  [CategoryType.ACCOMMODATION]: categoryBedIcon,
};

// 3. 아이콘을 반환하는 함수
export const getCategoryIcon = (filterType: CategoryType): string => {
  return categoryIconMap[filterType];
};

// 1. 필터 타입을 enum으로 정의
export enum FilterType {
  MOBILITY_IMPAIRED = '보행약자',
  VISUALLY_IMPAIRED = '시각약자',
  HEARING_IMPAIRED = '청각약자',
  INFANT_ACCOMPANIED = '영유아동반',
}

// 2. 아이콘 매핑 객체 생성
const filterIconMap: Record<FilterType, string> = {
  [FilterType.MOBILITY_IMPAIRED]: filterMobility,
  [FilterType.VISUALLY_IMPAIRED]: filterBlind,
  [FilterType.HEARING_IMPAIRED]: filterDeaf,
  [FilterType.INFANT_ACCOMPANIED]: filterInfant,
};

// // 3. 아이콘을 반환하는 함수
export const getFilterIcon = (filterType: FilterType): string => {
  return filterIconMap[filterType];
};
