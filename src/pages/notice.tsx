import { Suspense, lazy, useLayoutEffect } from "react";
import { useAppDispatch } from "@reducers/index";
import { noticeThunks } from "@reducers/slices";

const SearchBox = lazy(() => import("@components/notice/notice.searchBox"));
const NoticeListBox = lazy(
  () => import("@components/notice/notice.noticeListBox")
);
const CreateNoticeBox = lazy(
  () => import("@components/notice/notice.createNoticeBox")
);

const Notice = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(noticeThunks.getNoticeListThunk());
  }, []);

  return (
    <div className="container">
      <Suspense fallback={<>loading...</>}>
        <SearchBox />
      </Suspense>
      <Suspense fallback={<>loading...</>}>
        <NoticeListBox />
      </Suspense>
      <Suspense fallback={<>loading...</>}>
        <CreateNoticeBox />
      </Suspense>
    </div>
  );
};

export default Notice;
