import { useEffect, Suspense, lazy } from "react";
import { useAppDispatch, useAppSelector } from "@reducers/index";
import { mainThunks } from "@reducers/slices";

const UserStatusBox = lazy(() => import("@components/main/userStatusBox"));

const Main = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(({ AUTH }) => AUTH);

  useEffect(() => {
    if (userInfo) {
      dispatch(mainThunks.getUserStatusThunk());
      dispatch(mainThunks.getCustomerInquiryThunk());
      dispatch(mainThunks.postDAUThunk());
      dispatch(mainThunks.postUserDAUThunk());
      dispatch(mainThunks.getUserNotice());
    }
  }, []);
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <UserStatusBox />
      </Suspense>
    </>
  );
};

export default Main;
