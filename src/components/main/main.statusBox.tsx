import { useAppSelector } from "@reducers/index";

const UserStatusBox = () => {
  const { userStatus } = useAppSelector(({ MAIN }) => MAIN);

  return (
    <>
      {userStatus && (
        <div className="main-nav-left">
          <header>사용자 현황</header>
          <div className="half_module">
            <ul className="appinfo_statelist">
              <li>
                <span className="appinfo_statelist_span">11</span>
                <strong className="appinfo_statelist_strong">123</strong>
              </li>
              <li>
                <span className="appinfo_statelist_span">11</span>
                <strong className="appinfo_statelist_strong">123</strong>
              </li>
              <li>
                <span className="appinfo_statelist_span">11</span>
                <strong className="appinfo_statelist_strong">123</strong>
              </li>
              <li>
                <span className="appinfo_statelist_span">11</span>
                <strong className="appinfo_statelist_strong">123</strong>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default UserStatusBox;
