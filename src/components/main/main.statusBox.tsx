import { useAppSelector } from "@reducers/index";

const UserStatusBox = () => {
  const { userStatus } = useAppSelector(({ MAIN }) => MAIN);

  return (
    <>
      {userStatus && (
        <div className="main-nav-left">
          <header>사용자 현황</header>
          <div className="half_module">
            {!!userStatus && (
              <ul className="appinfo_statelist">
                <li>
                  <span className="appinfo_statelist_span">
                    {userStatus?.dau}
                  </span>
                  <strong className="appinfo_statelist_strong">DAU</strong>
                </li>
                <li>
                  <span className="appinfo_statelist_span">
                    {userStatus?.experiencedUser}
                  </span>
                  <strong className="appinfo_statelist_strong">
                    체험 사용자
                  </strong>
                </li>
                <li>
                  <span className="appinfo_statelist_span">
                    {userStatus?.freeUser}
                  </span>
                  <strong className="appinfo_statelist_strong">
                    무료 사용자
                  </strong>
                </li>
                <li>
                  <span className="appinfo_statelist_span">
                    {userStatus?.paidUser}
                  </span>
                  <strong className="appinfo_statelist_strong">
                    유료 사용자
                  </strong>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserStatusBox;
