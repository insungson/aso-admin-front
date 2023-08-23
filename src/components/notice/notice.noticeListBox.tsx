import { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import { noticeSliceActions, noticeThunks } from "@reducers/slices";
import { INoticeListInfo } from "@models/notice";
import Grid from "@components/gridchart/gridchart";
import { CreateNoticePageOptions } from "@classes/gridchart/noticePageCharts";
import { fetchPutNoticeDeploy } from "@apis/api.notice";

const NoticeListBox = () => {
  const dispatch = useAppDispatch();
  const { noticeList, filterObj } = useAppSelector(({ NOTICE }) => NOTICE);

  const [gridOption, setGridOption] = useState(null);

  useEffect(() => {
    if (noticeList.length > 0) {
      setGridOption(
        new CreateNoticePageOptions().getNoticeList(
          noticeList,
          onClickDeploy,
          onClickEdit,
          filterObj
        )
      );
    }
  }, [filterObj, noticeList]);

  const onClickDeploy = useCallback(async (obj: INoticeListInfo) => {
    const result = await fetchPutNoticeDeploy(obj);
    if (result) {
      dispatch(noticeSliceActions.setDeployNoticeList(obj));
    }
  }, []);

  const onClickEdit = useCallback((obj: INoticeListInfo) => {
    // 수정 팝업 띄우는 처리하기!!
    dispatch(noticeThunks.getNoticeInfoDetail(obj));
  }, []);

  return (
    <div className="table-api-wrap">
      <div className="table-api">{gridOption && <Grid {...gridOption} />}</div>
    </div>
  );
};

export default NoticeListBox;
