import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="relative layout-container">
      <main className="overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
