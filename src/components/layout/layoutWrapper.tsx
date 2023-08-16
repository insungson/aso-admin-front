import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const LeftMenu = lazy(() => import("@components/layout/leftMenu"));

const LayoutWrapper = () => {
  return (
    <div id="wrap">
      {/* leftMenu 관련 */}
      <div className="left-content active">
        <Suspense fallback={<>loading...</>}>
          <LeftMenu />
        </Suspense>
      </div>
      {/* 메인페이지 관련 */}
      <div className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
