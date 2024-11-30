import back_arrow from '@/assets/svg/back_arrow.svg';

const StaticHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-[56px] border-b-[1px] bg-white ">
      <div className="text-2xl font-bold p-3 flex items-center text-lg">
        <img src={back_arrow} alt="info-card" className="m-1" />
        <p className="text-lg ml-1">{title}</p>
      </div>
    </div>
  );
};

export default StaticHeader;
