import DetailAccessInfo from '@/components/details/DetailAccessInfo';
import DetailBasicInfo from '@/components/details/DetailBasicInfo';
import DetailIntroInfo from '@/components/details/DetailIntroInfo';
import DetailReservationBtn from '@/components/details/DetailReservationBtn';

const DetailPage = () => {
  return (
    <div className="mb-16">
      <DetailIntroInfo />
      <DetailAccessInfo />
      <DetailBasicInfo />
      <DetailReservationBtn />
    </div>
  );
};

export default DetailPage;
