import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@reducers/index";
import {} from "@reducers/slices";

import LayoutWrapper from "@components/layout/layoutWrapper";
import Login from "@pages/login";
import Main from "@pages/main";
import Member from "@pages/member";
import Notice from "@pages/notice";
import Inquiry from "@pages/inquiry";

const MainRoute: React.FC<{}> = () => {
  const { userInfo } = useAppSelector(({ AUTH }) => AUTH);
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/main" element={<Main />} />
        <Route path="/member" element={<Member />} />
        <Route path="/subscribe" element={<>subscribe</>} />
        <Route path="/cancle" element={<>cancle</>} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/inquiry" element={<Inquiry />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          userInfo ? <Navigate to={"/main"} /> : <Navigate to={"/login"} />
        }
      />
    </Routes>
  );
};

export default MainRoute;
