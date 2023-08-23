import { FC, useState } from "react";
import PopupWrapper from "@components/popup/popupWrapper";
import { useAppSelector } from "@reducers/index";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface IPropsNoticePopup {
  onClickPopupClosed: () => void;
}

const NoticePopup: FC<IPropsNoticePopup> = ({ onClickPopupClosed }) => {
  const { editNoticeInfo } = useAppSelector(({ NOTICE }) => NOTICE);

  const [editorState, setEditorState] = useState({
    contests_en: EditorState.createEmpty(),
    contests_ko: EditorState.createEmpty(),
    contests_ja: EditorState.createEmpty(),
  });
  const onEditorStateChange = (editorState, name: "en" | "ko" | "ja") => {
    switch (name) {
      case "en":
        return setEditorState((prev) => ({
          ...prev,
          contests_en: editorState,
        }));
      case "ko":
        return setEditorState((prev) => ({
          ...prev,
          contests_ko: editorState,
        }));
      case "ja":
        return setEditorState((prev) => ({
          ...prev,
          contests_ko: editorState,
        }));
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      console.log("values: ", values);
      onClickPopupClosed();
    },
  });

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
                <form onSubmit={formik.handleSubmit}>
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
                            <span>(english))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <label className="ipt">
                            <input
                              type="text"
                              name="email"
                              placeholder={"제목을 입력해주세요 (english))"}
                              value={formik.values.title_en}
                              onChange={formik.handleChange}
                              className={formik?.errors?.title_en && "error"}
                            />
                            {Boolean(formik.errors.title_en) && (
                              <span className="error-txt">
                                {formik.errors.title_en}
                              </span>
                            )}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">
                          <div className="notice_popup_table_th">
                            <span>제목</span>
                            <span>(korean))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <label className="ipt">
                            <input
                              type="text"
                              name="email"
                              placeholder={"제목을 입력해주세요 (korean)"}
                              value={formik.values.title_ko}
                              onChange={formik.handleChange}
                              className={formik?.errors?.title_ko && "error"}
                            />
                            {Boolean(formik.errors.title_ko) && (
                              <span className="error-txt">
                                {formik.errors.title_ko}
                              </span>
                            )}
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">
                          <div className="notice_popup_table_th">
                            <span>제목</span>
                            <span>(japanese))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <label className="ipt">
                            <input
                              type="text"
                              name="email"
                              placeholder={"제목을 입력해주세요 (japanese)"}
                              value={formik.values.title_ja}
                              onChange={formik.handleChange}
                              className={formik?.errors?.title_ja && "error"}
                            />
                            {Boolean(formik.errors.title_ja) && (
                              <span className="error-txt">
                                {formik.errors.title_ja}
                              </span>
                            )}
                          </label>
                        </td>
                      </tr>
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
                              name="charge"
                              className="ipt-radio"
                              id="radio-1"
                              value={"all"}
                              onChange={formik.handleChange}
                              checked={formik.values.noticeSubject === "all"}
                            />
                            <label htmlFor="radio-1">
                              <span>전체</span>
                            </label>
                            <input
                              type="radio"
                              name="charge"
                              className="ipt-radio"
                              id="radio-2"
                              value={"free"}
                              onChange={formik.handleChange}
                              checked={formik.values.noticeSubject === "free"}
                            />
                            <label htmlFor="radio-2">
                              <span>무료</span>
                            </label>
                            <input
                              type="radio"
                              name="charge"
                              className="ipt-radio"
                              id="radio-3"
                              value={"paid"}
                              onChange={formik.handleChange}
                              checked={formik.values.noticeSubject === "paid"}
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
                              checked={formik.values.deploy}
                              // onChange={() => deployFn(row)}
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
                              name="charge"
                              className="ipt-radio"
                              id="radio-4"
                              value={"all"}
                              onChange={formik.handleChange}
                              checked={formik.values.noticeSubject === "once"}
                            />
                            <label htmlFor="radio-4">
                              <span>1회 노출</span>
                            </label>
                            <input
                              type="radio"
                              name="charge"
                              className="ipt-radio"
                              id="radio-5"
                              value={"free"}
                              onChange={formik.handleChange}
                              checked={
                                formik.values.noticeSubject === "repeated"
                              }
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
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                              />{" "}
                              ~{" "}
                              <input
                                type="date"
                                name="endDate"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">
                          <div className="notice_popup_table_th">
                            <span>내용</span>
                            <span>(english))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <div>
                            <Editor
                              editorState={editorState.contests_en}
                              wrapperClassName="demo-wrapper"
                              editorClassName="notice_editor"
                              onEditorStateChange={(e) =>
                                onEditorStateChange(e, "en")
                              }
                            />
                            {/* <textarea
                              disabled
                              value={draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )}
                            /> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">
                          <div className="notice_popup_table_th">
                            <span>내용</span>
                            <span>(korean))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <div>
                            <Editor
                              editorState={editorState.contests_ko}
                              wrapperClassName="demo-wrapper"
                              editorClassName="notice_editor"
                              onEditorStateChange={(e) =>
                                onEditorStateChange(e, "ko")
                              }
                            />
                            {/* <textarea
                              disabled
                              value={draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )}
                            /> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">
                          <div className="notice_popup_table_th">
                            <span>내용</span>
                            <span>(japanese))</span>
                          </div>
                        </th>
                        <td colSpan={3}>
                          <div>
                            <Editor
                              editorState={editorState.contests_ja}
                              wrapperClassName="demo-wrapper"
                              editorClassName="notice_editor"
                              onEditorStateChange={(e) =>
                                onEditorStateChange(e, "ja")
                              }
                            />
                            {/* <textarea
                              disabled
                              value={draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )}
                            /> */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default NoticePopup;
