import "react-quill/dist/quill.snow.css";
import { FC, useState, useEffect } from "react";
import PopupWrapper from "@components/popup/popupWrapper";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import moment from "moment";
import ReactQuill from "react-quill";
import { fetchPostWriteNotice } from "@apis/index";
import { noticeThunks, noticeSliceActions } from "@reducers/slices/index";

interface IPropsNoticePopup {
  onClickPopupClosed: () => void;
}

const NoticePopup: FC<IPropsNoticePopup> = ({ onClickPopupClosed }) => {
  const dispatch = useAppDispatch();
  const { editNoticeInfo } = useAppSelector(({ NOTICE }) => NOTICE);

  const [noticeState, setNoticeState] = useState({
    title_ko: "",
    contents_ko: "",
    textLink_ko: "",
    url_ko: "",

    title_en: "",
    contents_en: "",
    textLink_en: "",
    url_en: "",

    title_ja: "",
    contents_ja: "",
    textLink_ja: "",
    url_ja: "",

    noticeSubject: "all",
    noticeMethod: "once",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    deploy: false,
  });

  useEffect(() => {
    if (Object.keys(editNoticeInfo).length > 0) {
      setNoticeState({
        title_ko: editNoticeInfo["title_ko"],
        contents_ko: editNoticeInfo["contents_ko"],
        textLink_ko: editNoticeInfo["textLink_ko"],
        url_ko: editNoticeInfo["url_ko"],

        title_en: editNoticeInfo["title_en"],
        contents_en: editNoticeInfo["contents_en"],
        textLink_en: editNoticeInfo["textLink_en"],
        url_en: editNoticeInfo["url_en"],

        title_ja: editNoticeInfo["title_ja"],
        contents_ja: editNoticeInfo["contents_ja"],
        textLink_ja: editNoticeInfo["textLink_ja"],
        url_ja: editNoticeInfo["url_ja"],

        noticeSubject: editNoticeInfo["noticeSubject"],
        noticeMethod: editNoticeInfo["noticeMethod"],
        startDate: moment(new Date(editNoticeInfo["startDate"])).format(
          "YYYY-MM-DD"
        ),
        endDate: moment(new Date(editNoticeInfo["endDate"])).format(
          "YYYY-MM-DD"
        ),
        deploy: editNoticeInfo["deploy"],
      });
    }
  }, [editNoticeInfo]);

  const onEditorStateChange = (html, name: "en" | "ko" | "ja") => {
    switch (name) {
      case "en":
        return setNoticeState((prev) => ({
          ...prev,
          contents_en: html,
        }));
      case "ko":
        return setNoticeState((prev) => ({
          ...prev,
          contents_ko: html,
        }));
      case "ja":
        return setNoticeState((prev) => ({
          ...prev,
          contents_ja: html,
        }));
      default:
        break;
    }
  };

  const onChangeState = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title_ko":
        return setNoticeState((prev) => ({ ...prev, title_ko: value }));
      case "contents_ko":
        return setNoticeState((prev) => ({ ...prev, contents_ko: value }));
      case "textLink_ko":
        return setNoticeState((prev) => ({ ...prev, textLink_ko: value }));
      case "url_ko":
        return setNoticeState((prev) => ({ ...prev, url_ko: value }));
      case "title_en":
        return setNoticeState((prev) => ({ ...prev, title_en: value }));
      case "contents_en":
        return setNoticeState((prev) => ({ ...prev, contents_en: value }));
      case "textLink_en":
        return setNoticeState((prev) => ({ ...prev, textLink_en: value }));
      case "url_en":
        return setNoticeState((prev) => ({ ...prev, url_en: value }));
      case "title_ja":
        return setNoticeState((prev) => ({ ...prev, title_ja: value }));
      case "contents_ja":
        return setNoticeState((prev) => ({ ...prev, contents_ja: value }));
      case "textLink_ja":
        return setNoticeState((prev) => ({ ...prev, textLink_ja: value }));
      case "url_ja":
        return setNoticeState((prev) => ({ ...prev, url_ja: value }));
      case "noticeSubject":
        return setNoticeState((prev) => ({ ...prev, noticeSubject: value }));
      case "noticeMethod":
        return setNoticeState((prev) => ({ ...prev, noticeMethod: value }));
      case "startDate":
        return setNoticeState((prev) => ({
          ...prev,
          startDate: moment(value).format("YYYY-MM-DD"),
        }));
      case "endDate":
        return setNoticeState((prev) => ({
          ...prev,
          endDate: moment(value).format("YYYY-MM-DD"),
        }));
      case "deploy":
        return setNoticeState((prev) => ({ ...prev, deploy: !prev.deploy }));
      default:
        break;
    }
  };

  const onClickWriteNotice = async () => {
    const response = await fetchPostWriteNotice(noticeState);
    if (response) {
      // 리스트 재요청 + 공지수정 정보 초기화처리
      dispatch(noticeThunks.getNoticeListThunk());
      dispatch(noticeSliceActions.setEditNoticeInfo({}));
      // 팝업 닫기처리
      onClickPopupClosed();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <PopupWrapper>
      <div className="lpopup-wrap">
        <div className="lpopup-content pop_sty_wrp">
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
              <div className="tb-basic-inner" style={{ overflow: "hidden" }}>
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
                          <span>노출 대상</span>
                        </div>
                      </th>
                      <td>
                        <div className="radio-box">
                          <input
                            type="radio"
                            name="noticeSubject"
                            className="ipt-radio"
                            id="radio-1"
                            value={"all"}
                            onChange={onChangeState}
                            checked={noticeState.noticeSubject === "all"}
                          />
                          <label htmlFor="radio-1">
                            <span>전체</span>
                          </label>
                          <input
                            type="radio"
                            name="noticeSubject"
                            className="ipt-radio"
                            id="radio-2"
                            value={"free"}
                            onChange={onChangeState}
                            checked={noticeState.noticeSubject === "free"}
                          />
                          <label htmlFor="radio-2">
                            <span>무료</span>
                          </label>
                          <input
                            type="radio"
                            name="noticeSubject"
                            className="ipt-radio"
                            id="radio-3"
                            value={"paid"}
                            onChange={onChangeState}
                            checked={noticeState.noticeSubject === "paid"}
                          />
                          <label htmlFor="radio-3">
                            <span>요금제(일반)</span>
                          </label>
                        </div>
                      </td>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>배포 설정</span>
                        </div>
                      </th>
                      <td>
                        <div>
                          <input
                            type="checkbox"
                            className="ipt-check enable"
                            id={"deploy-1"}
                            name="deploy"
                            checked={noticeState.deploy}
                            onChange={onChangeState}
                          />
                          <label htmlFor={"deploy-1"}>
                            <span className="blind">선택</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>노출 방식</span>
                        </div>
                      </th>
                      <td>
                        <div className="radio-box">
                          <input
                            type="radio"
                            name="noticeMethod"
                            className="ipt-radio"
                            id="radio-4"
                            value={"once"}
                            onChange={onChangeState}
                            checked={noticeState.noticeMethod === "once"}
                          />
                          <label htmlFor="radio-4">
                            <span>1회 노출</span>
                          </label>
                          <input
                            type="radio"
                            name="noticeMethod"
                            className="ipt-radio"
                            id="radio-5"
                            value={"repeated"}
                            onChange={onChangeState}
                            checked={noticeState.noticeMethod === "repeated"}
                          />
                          <label htmlFor="radio-5">
                            <span>반복 노출</span>
                          </label>
                        </div>
                      </td>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>기간 설정</span>
                        </div>
                      </th>
                      <td>
                        <div className="member_manage_date_form">
                          <div>
                            <input
                              type="date"
                              name="startDate"
                              value={noticeState.startDate}
                              onChange={onChangeState}
                            />{" "}
                            ~{" "}
                            <input
                              type="date"
                              name="endDate"
                              value={noticeState.endDate}
                              onChange={onChangeState}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ height: "5px" }}></tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>제목</span>
                          <span>(english)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <label className="ipt">
                          <input
                            type="text"
                            name="title_en"
                            placeholder={"제목을 입력해주세요 (english))"}
                            value={noticeState.title_en}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>내용</span>
                          <span>(english)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <div>
                          <ReactQuill
                            theme="snow"
                            value={noticeState.contents_en}
                            onChange={(e) => onEditorStateChange(e, "en")}
                            modules={modules}
                            formats={formats}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>링크 Text</span>
                          <span>(english)</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="textLink_en"
                            placeholder={"링크 Text를 입력해주세요 (english))"}
                            value={noticeState.textLink_en}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>URL</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="url_en"
                            placeholder={"URL을 입력해주세요 (english))"}
                            value={noticeState.url_en}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr style={{ height: "5px" }}></tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>제목</span>
                          <span>(korean)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <label className="ipt">
                          <input
                            type="text"
                            name="title_ko"
                            placeholder={"제목을 입력해주세요 (korean)"}
                            value={noticeState.title_ko}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_ko && "error"}
                          />
                          {/* {Boolean(formik.errors.title_ko) && (
                            <span className="error-txt">
                              {formik.errors.title_ko}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>내용</span>
                          <span>(korean)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <div>
                          <ReactQuill
                            theme="snow"
                            value={noticeState.contents_ko}
                            onChange={(e) => onEditorStateChange(e, "ko")}
                            modules={modules}
                            formats={formats}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>링크 Text</span>
                          <span>(korean)</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="textLink_ko"
                            placeholder={"링크 Text를 입력해주세요 (english))"}
                            value={noticeState.textLink_ko}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>URL</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="url_ko"
                            placeholder={"URL을 입력해주세요 (english))"}
                            value={noticeState.url_ko}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr style={{ height: "5px" }}></tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>제목</span>
                          <span>(japanese)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <label className="ipt">
                          <input
                            type="text"
                            name="title_ja"
                            placeholder={"제목을 입력해주세요 (japanese)"}
                            value={noticeState.title_ja}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_ja && "error"}
                          />
                          {/* {Boolean(formik.errors.title_ja) && (
                            <span className="error-txt">
                              {formik.errors.title_ja}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>내용</span>
                          <span>(japanese)</span>
                        </div>
                      </th>
                      <td colSpan={3}>
                        <div>
                          <ReactQuill
                            theme="snow"
                            value={noticeState.contents_ja}
                            onChange={(e) => onEditorStateChange(e, "ja")}
                            modules={modules}
                            formats={formats}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>링크 Text</span>
                          <span>(japanese)</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="textLink_ja"
                            placeholder={"링크 Text를 입력해주세요 (english))"}
                            value={noticeState.textLink_ja}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                      <th scope="col">
                        <div className="notice_popup_table_th">
                          <span>URL</span>
                        </div>
                      </th>
                      <td>
                        <label className="ipt">
                          <input
                            type="text"
                            name="url_ja"
                            placeholder={"URL을 입력해주세요 (english))"}
                            value={noticeState.url_ja}
                            onChange={onChangeState}
                            // className={formik?.errors?.title_en && "error"}
                          />
                          {/* {Boolean(formik.errors.title_en) && (
                            <span className="error-txt">
                              {formik.errors.title_en}
                            </span>
                          )} */}
                        </label>
                      </td>
                    </tr>
                    <tr style={{ height: "5px" }}></tr>
                  </tbody>
                </table>
                <div className="notice_editor_btn">
                  <button className="btn pri" onClick={onClickWriteNotice}>
                    {Object.keys(editNoticeInfo).length > 0
                      ? "공지수정"
                      : "공지작성"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default NoticePopup;
