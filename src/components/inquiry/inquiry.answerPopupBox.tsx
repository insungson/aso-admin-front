import "react-quill/dist/quill.snow.css";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import PopupWrapper from "@components/popup/popupWrapper";
import ReactQuill from "react-quill";
import { useQuery } from "react-query";
import { fetchInquirySeq, fetchUserInquiryList } from "@apis/index";
import { inquirySliceActions } from "@reducers/slices";
import { FadeLoader } from "react-spinners";
import moment from "moment";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import HTMLReactParser from "html-react-parser";
import { IInquiryListInfo } from "@models/inquiry";
import GridConditionalRow from "@components/gridchart/gridchart.conditionalRows";
import { CreateInquiryPageOptions } from "@classes/gridchart/inquiryPageCharts";

const AnswerPopupBox = () => {
  const dispatch = useAppDispatch();
  const { answerInquiryInfo } = useAppSelector(({ INQUIRY }) => INQUIRY);

  // 문의 이미지 처리 state
  const [inquiryImages, setInquiryImages] = useState([]);
  // 문의 답변 처리 state
  const [inquiryText, setInquiryText] = useState("");

  // 문의 이미지 onChange
  const onChangeInquiryImages = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setInquiryImages(imageList as never[]);
  };

  // 문의 답변 onChange
  const onChangeInquiryText = (html) => {
    setInquiryText(html);
  };

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

  // 사용자 문의 리스트 요청 ()
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

  // useEffect(() => {
  //   if (Object.keys(answerInquiryInfo).length > 0) {
  //     // 요청 사항들..
  //     // 1. 문의 게시글 요청(디테일)
  //     // 2. 작성자 게시글 리스트 요청
  //   }
  // }, [answerInquiryInfo]);

  const onClickPopupClosed = () => {
    dispatch(inquirySliceActions.setAnswerInquiryInfo({}));
  };

  const onClickEditInGrid = useCallback((params: IInquiryListInfo) => {
    dispatch(inquirySliceActions.setAnswerInquiryInfo(params));
  }, []);

  const onClickEditButton = () => {
    if (!!answerInquiryInfo) {
      dispatch(inquirySliceActions.setAnswerInquiryInfo({}));
      //formData 에 추가처리
      const formData = new FormData();
      //@ts-ignore
      formData.append("seq", answerInquiryInfo?.seq);
      formData.append("user", "admin01");
      formData.append("inquiryImages", new Blob(inquiryImages));
      formData.append("inquiryText", inquiryText);
      const test = {
        inquiryText: formData.getAll("inquiryText"),
        seq: formData.getAll("seq"),
        user: formData.getAll("user"),
        inquiryImages: formData.getAll("inquiryImages"),
      };

      console.log("test", test);
      console.log("form", formData);
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
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>카테 고리</span>
                            </div>
                          </th>
                          <td>
                            {/* @ts-ignore */}
                            <div>{inquiryDetailData?.inquiryInfo?.title}</div>
                          </td>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>답변 여부</span>
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
                              <span>문의 내용 이미지</span>
                            </div>
                          </th>
                          <td colSpan={3}>
                            <div className="inquiry_image_div">
                              {/* @ts-ignore */}
                              {inquiryDetailData?.files.map((item, index) => (
                                <img height={100} key={index} src={item} />
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>문의 내용</span>
                            </div>
                          </th>
                          <td colSpan={3}>
                            <div>
                              {/* @ts-ignore */}
                              {!!inquiryDetailData?.inquiryInfo &&
                                HTMLReactParser(
                                  // @ts-ignore
                                  inquiryDetailData?.inquiryInfo?.contents
                                )}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>답변 내용 이미지</span>
                            </div>
                          </th>
                          <td colSpan={3}>
                            <ReactImageUploading
                              multiple
                              value={inquiryImages}
                              onChange={onChangeInquiryImages}
                              maxNumber={5}
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                <div className="upload__image-wrapper">
                                  <button
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                    className="btn pri"
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >
                                    Click or Drop here
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn pri"
                                    onClick={onImageRemoveAll}
                                  >
                                    Remove all images
                                  </button>
                                  <div className="inquiry_imageList_div">
                                    {imageList.map((image, index) => (
                                      <div
                                        key={index}
                                        className="inquiry_image_div"
                                      >
                                        <img
                                          src={image.dataURL}
                                          alt=""
                                          width="100"
                                        />
                                        <div className="image-item__btn-wrapper">
                                          <button
                                            className="inquiry_image_left_btn"
                                            onClick={() => onImageUpdate(index)}
                                          >
                                            Update
                                          </button>
                                          <button
                                            className="inquiry_image_right_btn"
                                            onClick={() => onImageRemove(index)}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </ReactImageUploading>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">
                            <div className="notice_popup_table_th">
                              <span>답변 내용</span>
                            </div>
                          </th>
                          <td colSpan={3}>
                            <div>
                              <ReactQuill
                                theme="snow"
                                value={inquiryText}
                                onChange={onChangeInquiryText}
                                modules={modules}
                                formats={formats}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="notice_editor_btn">
                      <button className="btn pri" onClick={onClickEditButton}>
                        답변 및 수정하기
                      </button>
                    </div>
                  </div>
                </div>
                {/* 사용자 관련문의 리스트 */}
                {!!userInquiryListData && (
                  <GridConditionalRow
                    {...new CreateInquiryPageOptions().getUserInquiryList(
                      //@ts-ignore
                      userInquiryListData,
                      onClickEditInGrid,
                      answerInquiryInfo
                    )}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PopupWrapper>
  );
};

export default AnswerPopupBox;
