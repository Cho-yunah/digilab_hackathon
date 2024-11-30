import DetailAccessInfo from '@/components/details/DetailAccessInfo';
import DetailBasicInfo from '@/components/details/DetailbasicInfo';
import DetailIntroInfo from '@/components/details/DetailIntroInfo';
import DetailReservationBtn from '@/components/details/DetailReservationBtn';

const DetailPage = () => {
  return (
    <div>
      <DetailIntroInfo />
      <DetailAccessInfo />
      <DetailBasicInfo />
      <DetailReservationBtn />
    </div>
  );
};

export default DetailPage;
