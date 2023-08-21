import { Suspense, lazy } from "react";

const SearchBox = lazy(() => import("@components/member/member.searchBox"));
const MemberListBox = lazy(
  () => import("@components/member/member.memberListBox")
);

const Member = () => {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <SearchBox />
      </Suspense>
      <Suspense fallback={<>loading...</>}>
        <MemberListBox />
      </Suspense>
    </>
  );
};

export default Member;
