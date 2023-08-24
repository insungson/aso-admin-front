import { Suspense, lazy, useLayoutEffect } from "react";
import { useAppDispatch } from "@reducers/index";
import { inquiryThunks } from "@reducers/slices/index";

const SearchBox = lazy(() => import("@components/inquiry/inquiry.searchBox"));

const Inquiry = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(inquiryThunks.getInquiryListThunk("list"));
  }, []);

  return (
    <div className="container">
      <Suspense fallback={<>loading...</>}>
        <SearchBox />
      </Suspense>
    </div>
  );
};

export default Inquiry;
