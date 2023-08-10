import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "@reducers/index";

const MainRoute: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/login" element={<>login</>} />
      <Route path="/main" element={<>Main</>} />
    </Routes>
  );
};

export default MainRoute;
