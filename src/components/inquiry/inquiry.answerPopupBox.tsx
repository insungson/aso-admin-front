import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import PopupWrapper from "@components/popup/popupWrapper";
import ReactQuill from "react-quill";
import { useQuery } from "react-query";
import { fetchInquirySeq, fetchUserInquiryList } from "@apis/index";
import { inquirySliceActions } from "@reducers/slices";
import { FadeLoader } from "react-spinners";
import moment from "moment";

const AnswerPopupBox = () => {
  const dispatch = useAppDispatch();
  const { answerInquiryInfo } = useAppSelector(({ INQUIRY }) => INQUIRY);

  const [inquiryText, setInquiryText] = useState("");

  // 개별 문의 요청
  const {
    status: inquiryDetailStatus,
    data: inquiryDetailData,
    error: inquiryDetailError,
  } = useQuery(
    [{ fetchName: "fetchGetInquiryData" }, { ...answerInquiryInfo }],
    fetchInquirySeq,
    {
      enabled: Object.keys(answerInquiryInfo).length > 0,
      staleTime: 1000 * 60,
    }
  );

  // 사용자 문의 리스트 요청
  const {
    status: userInquiryListStatus,
    data: userInquiryListData,
    error: userInquiryListError,
  } = useQuery(
    [{ fetchName: "fetchGetUserInquiryList" }, { ...answerInquiryInfo }],
    fetchUserInquiryList,
    {
      enabled: Object.keys(answerInquiryInfo).length > 0,
      staleTime: 1000 * 60,
    }
  );

  useEffect(() => {
    if (Object.keys(answerInquiryInfo).length > 0) {
      // 요청 사항들..
      // 1. 문의 게시글 요청(디테일)
      // 2. 작성자 게시글 리스트 요청
    }
  }, [answerInquiryInfo]);

  const onClickPopupClosed = () => {
    dispatch(inquirySliceActions.setAnswerInquiryInfo({}));
  };

  return (
    <PopupWrapper>
      <div className="lpopup-wrap">
        <div className="lpopup-content pop_sty_wrp">
          {inquiryDetailStatus === "loading" && <FadeLoader />}
          {inquiryDetailStatus === "success" && inquiryDetailData && (
            <>
              <h2 className="lpopup-tit">
                공지사항
                <button
                  type="button"
                  className="lpopup-close"
                  onClick={onClickPopupClosed}
                >
                  <span className="blind">닫기</span>
                </button>
              </h2>
              <div className="container">
                <div className="tb-basic-wrap tb-type-1">
                  <div
                    className="tb-basic-inner"
                    style={{ overflow: "hidden" }}
                  >
                    <table>
                      <colgroup>
                        <col width="18%" />
                        <col width="31%" />
                        <col width="20%" />
                        <col width="31%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>제목</span>
                            </div>
                          </th>
                          <td>
                            {/* @ts-ignore */}
                            <div>{inquiryDetailData?.inquiryInfo?.title}</div>
                          </td>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>사용자 정보</span>
                            </div>
                          </th>
                          <td>
                            {/* @ts-ignore */}
                            <div>{inquiryDetailData?.inquiryInfo?.writer}</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>접수 시간</span>
                            </div>
                          </th>
                          <td>
                            {/* @ts-ignore */}
                            <div>{inquiryDetailData?.inquiryInfo?.title}</div>
                          </td>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>답변 시간</span>
                            </div>
                          </th>
                          <td>
                            {/* @ts-ignore */}
                            <div>{inquiryDetailData?.inquiryInfo?.writer}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PopupWrapper>
  );
};

export default AnswerPopupBox;
