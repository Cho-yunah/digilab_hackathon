import DetailAccessInfo from '@/components/details/DetailAccessInfo';
import DetailBasicInfo from '@/components/details/DetailbasicInfo';
import DetailIntroInfo from '@/components/details/DetailIntroInfo';

const DetailPage = () => {
  return (
    <div>
      <DetailIntroInfo />
      <DetailAccessInfo />
      <DetailBasicInfo />
    </div>
  );
};

export default DetailPage;
