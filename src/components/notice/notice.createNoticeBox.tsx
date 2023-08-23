import { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import { noticeSliceActions } from "@reducers/slices";
import NoticePopup from "./notice.createNoticeBox.popup";

const CreateNoticeBox = () => {
  const dispatch = useAppDispatch();
  const { editNoticeInfo } = useAppSelector(({ NOTICE }) => NOTICE);

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const onClickPopupClose = useCallback(() => {
    setIsOpenPopup(false);
  }, []);

  const onClickPopupOpen = () => {
    setIsOpenPopup(true);
    dispatch(noticeSliceActions.setEditNoticeInfo({}));
  };

  useEffect(() => {
    const keys = Object.keys(editNoticeInfo);
    if (keys.length > 0) {
      setIsOpenPopup(true);
    }
  }, [editNoticeInfo]);

  return (
    <>
      {/* 작성 버튼 */}
      <div className="notice_create_btn">
        <button className="btn pri" onClick={onClickPopupOpen}>
          공지작성
        </button>
      </div>
      {/* 팝업모달 */}
      {isOpenPopup && <NoticePopup onClickPopupClosed={onClickPopupClose} />}
    </>
  );
};

export default CreateNoticeBox;
