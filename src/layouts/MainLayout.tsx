import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="relative layout-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
