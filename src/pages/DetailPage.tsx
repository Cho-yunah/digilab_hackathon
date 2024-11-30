import DetailAccessInfo from '@/components/details/DetailAccessInfo';
import DetailBasicInfo from '@/components/details/DetailBasicInfo';
import DetailIntroInfo from '@/components/details/DetailIntroInfo';
import DetailReservationBtn from '@/components/details/DetailReservationBtn';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const { state } = useLocation();
  console.log('디테일 페이지', state);
  return (
    <div className="mb-16">
      <DetailIntroInfo state={state} />
      <DetailAccessInfo state={state} />
      <DetailBasicInfo state={state} />
      <DetailReservationBtn state={state} />
    </div>
  );
};

export default DetailPage;
