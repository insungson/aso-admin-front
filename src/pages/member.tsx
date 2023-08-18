import { useState, useEffect, ChangeEvent, MouseEventHandler } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const Member = () => {
  const [requestParams, setRequestParams] = useState({
    email: "",
    charge: "",
    country: "",
    startDate: "",
    endDate: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      charge: "all",
      country: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: yup.object({}),
    onSubmit: () => {},
  });

  useEffect(() => {
    console.log("formik: ", formik.values);
  }, [formik]);

  const onClickDateButton = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "today":
        break;
    }
  };

  const checkButtonActive = (): boolean => {
    return true;
  };

  return (
    <div className="container">
      <h2 className="account-tit">회원 검색</h2>

      <div className="tb-basic-wrap tb-type-1">
        <div className="tb-basic-inner">
          <table style={{ minWidth: 0 }}>
            <colgroup>
              <col width="18%" />
              <col width="31%" />
              <col width="20%" />
              <col width="31%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">검색어</th>
                <td colSpan={2}>
                  <label className="ipt">
                    <input
                      type="text"
                      name="email"
                      placeholder={"아이디 (이메일)"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </label>
                </td>
                <td colSpan={1}>
                  <label className="ipt">
                    <div className="account-btn" style={{ marginTop: 0 }}>
                      <button type="button" className="btn pri">
                        검색
                      </button>
                    </div>
                  </label>
                </td>
              </tr>
              <tr>
                <th scope="col">요금제</th>
                <td colSpan={3}>
                  <div className="radio-box">
                    <input
                      type="radio"
                      name="charge"
                      className="ipt-radio"
                      id="radio-1"
                      value={"all"}
                      onChange={formik.handleChange}
                      checked={formik.values.charge === "all"}
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
                      checked={formik.values.charge === "free"}
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
                      checked={formik.values.charge === "paid"}
                    />
                    <label htmlFor="radio-3">
                      <span>요금제(일반)</span>
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <th scope="col">사용 국가</th>
                <td>
                  <div className="select-box">
                    <label className="select">
                      <select
                        name="country"
                        onChange={formik.handleChange}
                        value={formik.values.country}
                      >
                        <option value={""}>Country</option>
                        <option value={"us"}>US</option>
                        <option value={"jp"}>Japan</option>
                        <option value={"kr"}>Korea</option>
                      </select>
                    </label>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="col">가입일자</th>
                <td colSpan={3}>
                  <div className="member_manage_date_form">
                    <div>
                      <input
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                      />{" "}
                      ~
                      <input
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="member_manage_date_btn"
                        name="today"
                        value={"today"}
                        onClick={onClickDateButton}
                      >
                        오늘
                      </button>
                      <button
                        type="button"
                        className="member_manage_date_btn_active"
                        name="7days"
                        value={"7days"}
                        onClick={onClickDateButton}
                      >
                        7일
                      </button>
                      <button
                        type="button"
                        className="member_manage_date_btn"
                        name="15days"
                        value={"15days"}
                        onClick={onClickDateButton}
                      >
                        15일
                      </button>
                      <button
                        type="button"
                        className="member_manage_date_btn"
                        name="1month"
                        value={"1month"}
                        onClick={onClickDateButton}
                      >
                        1개월
                      </button>
                      <button
                        type="button"
                        className="member_manage_date_btn"
                        name="3months"
                        value={"3months"}
                        onClick={onClickDateButton}
                      >
                        3개월
                      </button>
                      <button
                        type="button"
                        className="member_manage_date_btn"
                        name="all"
                        value={"all"}
                        onClick={onClickDateButton}
                      >
                        전체
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Member;
