import { Link } from "react-router-dom";
import LeftMenuItems from "./leftMenu.items";

const LeftMenu = () => {
  return (
    <div className="left-container">
      {/* 헤드관련 클릭시 main으로 페이지 이동처리 + 접속유지시간 적기 */}
      <div>
        <h1>
          <Link to={"/main"}>
            <span className="nav-main">AIX Admin</span>
          </Link>
        </h1>
        <div>
          <div>접속유지시간...</div>
          <div>접속자이멜...</div>
        </div>
      </div>
      아래는 leftmenu 관련
      <LeftMenuItems />
    </div>
  );
};

export default LeftMenu;
