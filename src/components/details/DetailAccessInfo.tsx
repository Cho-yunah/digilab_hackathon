import { useNavigate } from 'react-router-dom';
import signal_easy from '@/assets/img/signal_easy.png';
import signal_diff from '@/assets/img/signal_diff.png';
import signal_normal from '@/assets/img/signal_normal.png';
import degree from '@/assets/svg/degree_middle.svg';
import ic_parking from '@/assets/svg/ic_parkinglot.svg';
import ic_toilet from '@/assets/svg/ic_toilet.svg';

const DetailAccessInfo = ({ state }: any) => {
  const navigate = useNavigate();
  const facilityButtonHandler = () => {
    navigate('/:id/facility');
  };

  const { description } = state;
  const access = state.접근성;

  const AccessInfo = ({ access }: any) => {
    switch (state.접근성) {
      case '중':
        return <p className="text-base">일부 접근성 조건이 충족되어 있으나,이용에 약간의 불편함이 있을 수 있습니다.</p>;
      case '상':
        return <p className="text-base">대부분의 접근성 조건이 미흡하여, 이용에 상당한 어려움이 있을 수 있습니다.</p>;
      case '하':
        return <p className="text-base">공간 접근성 조건을 대부분 충족하여, 편리하게 이용할 수 있습니다.</p>;
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">접근성 정보</h2>
        <div className="flex items-center bg-stone-100 p-4 my-3 rounded-2xl gap-5">
          <img
            src={access == '중' ? signal_normal : access == '상' ? signal_diff : signal_easy}
            alt="info-card"
            width="78px"
          />
          <div className="scrollx-auto  overflow-hidden">
            <AccessInfo access={access} />
            {/* <p className="text-xs whitespace-prewrap">
            </p> */}
          </div>
        </div>
        <div className="px-1 py-3">
          <h3 className="font-semibold">공간 접근성</h3>
          <div className="grid grid-cols-2 grid-flow-row gap-5 py-2">
            {/* {AccessInfo(state)} */}
            <div className="flex items-center gap-3 text-base text-[#171719]">
              <img src={degree} alt="icon" />
              <p>도움 필요 중</p>
            </div>
            <div className="flex items-center gap-3">
              <img src={ic_parking} alt="icon" />
              <p>장애인 주차장</p>
            </div>
            <div className="flex items-center gap-3">
              <img src={ic_toilet} alt="icon" />
              <p>장애인 화장실</p>
            </div>
          </div>
          <button
            className="w-full bg-white rounded-xl mt-4 p-2 border-[#7c7c7f]"
            onClick={facilityButtonHandler}
          >{`편의시설 ${'3'}개 더보기 ❯`}</button>
        </div>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px] " />
    </>
  );
};

export default DetailAccessInfo;
