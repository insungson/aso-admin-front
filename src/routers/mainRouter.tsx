import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@reducers/index";
import {} from "@reducers/slices";

import LayoutWrapper from "@components/layout/layoutWrapper";
import Login from "@pages/login";
import Main from "@pages/main";

const MainRoute: React.FC<{}> = () => {
  const { userInfo } = useAppSelector(({ AUTH }) => AUTH);
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/main" element={<Main />} />
        <Route path="/member" element={<>member</>} />
        <Route path="/subscribe" element={<>subscribe</>} />
        <Route path="/cancle" element={<>cancle</>} />
        <Route path="/notice" element={<>notice</>} />
        <Route path="/inquiry" element={<>inquiry</>} />
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
