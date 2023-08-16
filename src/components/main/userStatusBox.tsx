import { useAppSelector } from "@reducers/index";

const UserStatusBox = () => {
  const { userStatus } = useAppSelector(({ MAIN }) => MAIN);

  return (
    <>
      {userStatus && (
        <div className="half_module">
          <ul className="appinfo_statelist">
            <li>
              <span>11</span>
              <strong>123</strong>
            </li>
            <li>
              <span>11</span>
              <strong>123</strong>
            </li>
            <li>
              <span>11</span>
              <strong>123</strong>
            </li>
            <li>
              <span>11</span>
              <strong>123</strong>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserStatusBox;
