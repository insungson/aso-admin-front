import { useAppSelector } from "@reducers/index";

const UserStatusBox = () => {
  const { userStatus } = useAppSelector(({ MAIN }) => MAIN);
  return <></>;
};

export default UserStatusBox;
