import { useEffect, Suspense, lazy } from "react";
import { useAppDispatch, useAppSelector } from "@reducers/index";
import { mainThunks } from "@reducers/slices";

const UserStatusBox = lazy(() => import("@components/main/main.statusBox"));
const CustomerInquiryBox = lazy(
  () => import("@components/main/main.customerInquiryBox")
);
const DAUBOX = lazy(() => import("@components/main/main.dauBox"));
const UserDAUBOX = lazy(() => import("@components/main/main.userDauBox"));

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
      <div className="main-nav">
        <Suspense fallback={<>loading...</>}>
          <UserStatusBox />
        </Suspense>
        <Suspense fallback={<>loading...</>}>
          <CustomerInquiryBox />
        </Suspense>
      </div>
      <div className="container">
        <div className="score-promotion-version">
          <Suspense fallback={<>loading...</>}>
            <DAUBOX />
          </Suspense>
          <Suspense fallback={<>loading...</>}>
            <UserDAUBOX />
          </Suspense>
        </div>
        <div className="score-box">56</div>
      </div>
    </>
  );
};

export default Main;
