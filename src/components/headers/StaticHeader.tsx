const StaticHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-[56px] border-b-[1px]">
      <div className="text-2xl font-bold p-4 flex text-lg">
        <img src="https://via.placeholder.com/24" alt="info-card" className="m-1" />
        <p className="text-lg ml-1">{title}</p>
      </div>
    </div>
  );
};

export default StaticHeader;
