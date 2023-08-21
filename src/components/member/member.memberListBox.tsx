import { useEffect, useState } from "react";
import { useAppSelector } from "@reducers/index";
import MemberListBoxExpand from "./member.memberListBox.Expand";
import { CreateMemberPageOptions } from "@classes/gridchart/memberPageCharts";
import GridExpand from "@components/gridchart/gridchart.expand";

const MemberListBox = () => {
  const { memberList } = useAppSelector(({ MEMBER }) => MEMBER);
  const [gridOption, setGridOption] = useState(null);

  useEffect(() => {
    if (memberList.length > 0) {
      console.log("memberList: ", memberList);
      setGridOption(new CreateMemberPageOptions().getMemberList(memberList));
    }
  }, [memberList]);

  return (
    <>
      {gridOption && (
        <GridExpand {...gridOption} ExpandedComponent={MemberListBoxExpand} />
      )}
    </>
  );
};

export default MemberListBox;
