import categoryBedIcon from '@/assets/svg/category_bed.svg';
import categoryBowlIcon from '@/assets/svg/category_bowl.svg';
import categoryBuildingIcon from '@/assets/svg/category_building.svg';
import categoryBedIconActive from '@/assets/svg/category_bed-active.svg';
import categoryBowlIconActive from '@/assets/svg/category_bowl-active.svg';
import categoryBuildingIconActive from '@/assets/svg/category_building-active.svg';

import filterMobility from '@/assets/svg/filter_mobility.svg';
import filterMobilityActive from '@/assets/svg/filter_mobility-active.svg';
import filterBlind from '@/assets/svg/filter_blind.svg';
import filterBlindActive from '@/assets/svg/filter_blind-active.svg';
import filterDeaf from '@/assets/svg/filter_deaf.svg';
import filterDeafActive from '@/assets/svg/filter_deaf-active.svg';
import filterInfant from '@/assets/svg/filter_infant.svg';
import filterInfantActive from '@/assets/svg/filter_infant-active.svg';

// 1. 카테고리 타입을 enum으로 정의
export enum CategoryType {
  TOUR = '관광지',
  RESTAURANT = '음식점',
  ACCOMMODATION = '숙박',
}

// 아이콘 상태 타입
export enum IconState {
  DEFAULT = 'default',
  ACTIVE = 'active',
}

// 2. 아이콘 매핑 객체 생성
const categoryIconMap: Record<CategoryType, { [key in IconState]: string }> = {
  [CategoryType.TOUR]: {
    [IconState.DEFAULT]: categoryBedIcon,
    [IconState.ACTIVE]: categoryBedIconActive,
  },
  [CategoryType.RESTAURANT]: {
    [IconState.DEFAULT]: categoryBowlIcon,
    [IconState.ACTIVE]: categoryBowlIconActive,
  },
  [CategoryType.ACCOMMODATION]: {
    [IconState.DEFAULT]: categoryBuildingIcon,
    [IconState.ACTIVE]: categoryBuildingIconActive,
  },
};

// 3. 아이콘을 반환하는 함수
export const getCategoryIcon = (filterType: CategoryType, state: IconState): string => {
  return categoryIconMap[filterType][state];
};

// 1. 필터 타입을 enum으로 정의
export enum FilterType {
  MOBILITY_IMPAIRED = '보행약자',
  VISUALLY_IMPAIRED = '시각약자',
  HEARING_IMPAIRED = '청각약자',
  INFANT_ACCOMPANIED = '영유아동반',
}

// 2. 아이콘 매핑 객체 생성
const filterIconMap: Record<FilterType, { [key in IconState]: string }> = {
  [FilterType.MOBILITY_IMPAIRED]: {
    [IconState.DEFAULT]: filterMobility,
    [IconState.ACTIVE]: filterMobilityActive,
  },
  [FilterType.VISUALLY_IMPAIRED]: {
    [IconState.DEFAULT]: filterBlind,
    [IconState.ACTIVE]: filterBlindActive,
  },
  [FilterType.HEARING_IMPAIRED]: {
    [IconState.DEFAULT]: filterDeaf,
    [IconState.ACTIVE]: filterDeafActive,
  },
  [FilterType.INFANT_ACCOMPANIED]: {
    [IconState.DEFAULT]: filterInfant,
    [IconState.ACTIVE]: filterInfantActive,
  },
};

// // 3. 아이콘을 반환하는 함수
export const getFilterIcon = (filterType: FilterType, state: IconState): string => {
  return filterIconMap[filterType][state];
};
