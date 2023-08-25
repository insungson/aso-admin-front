import { Suspense, lazy, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@reducers/index";
import { inquiryThunks } from "@reducers/slices/index";
import moment from "moment";
import { dateUtil } from "@utils/common";

const SearchBox = lazy(() => import("@components/inquiry/inquiry.searchBox"));
const InQuityListBox = lazy(
  () => import("@components/inquiry/inquiry.inquiryListBox")
);
const AnswerPopupBox = lazy(
  () => import("@components/inquiry/inquiry.answerPopupBox")
);

const Inquiry = () => {
  const dispatch = useAppDispatch();
  const { answerInquiryInfo } = useAppSelector(({ INQUIRY }) => INQUIRY);

  useLayoutEffect(() => {
    dispatch(
      inquiryThunks.getInquiryListThunk({
        searchTarget: "titleContents",
        searchKeyword: "",
        categoryCode: "all",
        startDate: moment(dateUtil.addDate(new Date(), -365)).format(
          "YYYY-MM-DD"
        ),
        endDate: moment().format("YYYY-MM-DD"),
        isAnswered: "0",
      })
    );
  }, []);

  return (
    <>
      <div className="container">
        <Suspense fallback={<>loading...</>}>
          <SearchBox />
        </Suspense>
        <Suspense fallback={<>loading...</>}>
          <InQuityListBox />
        </Suspense>
      </div>
      {Object.keys(answerInquiryInfo).length > 0 && (
        <Suspense fallback={<>loading...</>}>
          <AnswerPopupBox />
        </Suspense>
      )}
    </>
  );
};

export default Inquiry;
