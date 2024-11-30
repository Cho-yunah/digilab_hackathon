import StaticHeader from '@/components/headers/StaticHeader';

const FacilityInfoPage = () => {
  const facilities = [
    { title: '전동휠체어 급속충전기', description: '전동휠체어 급속충전기가 있습니다.' },
    { title: '점자안내판', description: '점자안내판(점자촉지도)이 있습니다.' },
    { title: '안내데스크', description: '안내데스크가 있습니다.' },
    { title: '안내견 출입 가능', description: '시각장애인 안내견 출입이 가능합니다.' },
    { title: '유아차 대여', description: '유아차를 대여할 수 있습니다.' },
    { title: '음성안내해설', description: '음성안내해설 서비스 이용이 가능합니다.' },
  ];

  const accessibilityDetails = [
    '23.09.13. 조사된 접근성 정보입니다. 이후 접근성 정보가 변동되었을 수 있습니다.',
    '4.3유적지석양오름학살터주차장 이용 가능하며, 장애인 전용 주차구역 있습니다.',
    '4.3유적지석양오름학살터주차장~알뜨르비행장및일본군비행기격납고 농로를 이용해야 하며, 바닥 배수로 있습니다.',
    '알뜨르비행장및일본군비행기격납고 앞 바닥 요철 마감 및 경사 있습니다.',
  ];

  return (
    <>
      <StaticHeader title="편의 시설" />
      <div className="p-4 bg-white w-full m-2">
        <ul className="space-y-4">
          {facilities.map((facility, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-500">Icon</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{facility.title}</p>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F2F2F2] w-full h-[8px]" />
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-3">접근성 정보</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {accessibilityDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FacilityInfoPage;
