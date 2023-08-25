import { useAppSelector, useAppDispatch } from "@reducers/index";
import { useState, useEffect, useCallback } from "react";
import { CreateInquiryPageOptions } from "@classes/gridchart/inquiryPageCharts";
import Grid from "@components/gridchart/gridchart";
import { inquirySliceActions } from "@reducers/slices";
import { IInquiryListInfo } from "@models/inquiry";

const InquiryListBox = () => {
  const dispatch = useAppDispatch();
  const { inquiryList } = useAppSelector(({ INQUIRY }) => INQUIRY);

  const [gridOption, setGridOption] = useState(null);

  useEffect(() => {
    if (inquiryList.length > 0) {
      setGridOption(
        new CreateInquiryPageOptions().getInquiryList(
          inquiryList,
          onOpenEditPopup
        )
      );
    }
  }, [inquiryList]);

  const onOpenEditPopup = useCallback((params: IInquiryListInfo) => {
    dispatch(inquirySliceActions.setAnswerInquiryInfo(params));
  }, []);

  return <>{gridOption && <Grid {...gridOption} />}</>;
};

export default InquiryListBox;
