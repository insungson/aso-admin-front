import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { dateUtil } from "@utils/common";
import { useAppDispatch } from "@reducers/index";
import { memberThunks } from "@reducers/slices";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      charge: "all",
      country: "all",
      startDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
      endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("email form isn't correct")
        .required("Required"),
      // charge: yup.string().required("Required"),
      // country: yup.string().required("Required"),
      // startDate: yup.string().required("Required"),
      // endDate: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
      dispatch(memberThunks.getMemberListThunk());
    },
  });

  // useEffect(() => {
  //   console.log("formik: ", formik.values);
  // }, [formik]);

  const onClickDateButton = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "today":
        formik.setValues({
          ...formik.values,
          startDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
      case "7days":
        formik.setValues({
          ...formik.values,
          startDate: moment(dateUtil.addDate(moment(), -7)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
      case "15days":
        formik.setValues({
          ...formik.values,
          startDate: moment(dateUtil.addDate(moment(), -15)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
      case "1month":
        formik.setValues({
          ...formik.values,
          startDate: moment(dateUtil.addDate(moment(), -30)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
      case "3months":
        formik.setValues({
          ...formik.values,
          startDate: moment(dateUtil.addDate(moment(), -90)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
      case "all": // all 의 startDate 기준은 2023-01-01
        formik.setValues({
          ...formik.values,
          startDate: "2023-01-01",
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        });
        break;
    }
  };

  const checkButtonActive = (beforeDays: number): boolean => {
    const { startDate, endDate } = formik.values;
    if (endDate === moment().format("YYYY-MM-DD")) {
      switch (beforeDays) {
        // 오늘
        case 0:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD")
          );
        // 7일 전
        case -7:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -7)).format("YYYY-MM-DD")
          );
        // 15일 전
        case -15:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -15)).format("YYYY-MM-DD")
          );
        // 1달 전
        case -30:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -30)).format("YYYY-MM-DD")
          );
        // 3달 전
        case -90:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -90)).format("YYYY-MM-DD")
          );
        // 전부 (2023-01-01)
        case -365:
          return startDate === "2023-01-01";
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <h2 className="account-tit">회원 검색</h2>

      <div className="tb-basic-wrap tb-type-1">
        <div className="tb-basic-inner">
          <form onSubmit={formik.handleSubmit}>
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
                        className={formik?.errors?.email && "error"}
                      />
                      {Boolean(formik.errors.email) && (
                        <span className="error-txt">{formik.errors.email}</span>
                      )}
                    </label>
                  </td>
                  <td colSpan={1}>
                    <label className="ipt">
                      <div className="account-btn" style={{ marginTop: 0 }}>
                        <button type="submit" className="btn pri">
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
                          <option value={"all"}>Country</option>
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
                          className={`member_manage_date_btn${
                            checkButtonActive(0) ? "_active" : ""
                          }`}
                          name="today"
                          value={"today"}
                          onClick={onClickDateButton}
                        >
                          오늘
                        </button>
                        <button
                          type="button"
                          className={`member_manage_date_btn${
                            checkButtonActive(-7) ? "_active" : ""
                          }`}
                          name="7days"
                          value={"7days"}
                          onClick={onClickDateButton}
                        >
                          7일
                        </button>
                        <button
                          type="button"
                          className={`member_manage_date_btn${
                            checkButtonActive(-15) ? "_active" : ""
                          }`}
                          name="15days"
                          value={"15days"}
                          onClick={onClickDateButton}
                        >
                          15일
                        </button>
                        <button
                          type="button"
                          className={`member_manage_date_btn${
                            checkButtonActive(-30) ? "_active" : ""
                          }`}
                          name="1month"
                          value={"1month"}
                          onClick={onClickDateButton}
                        >
                          1개월
                        </button>
                        <button
                          type="button"
                          className={`member_manage_date_btn${
                            checkButtonActive(-90) ? "_active" : ""
                          }`}
                          name="3months"
                          value={"3months"}
                          onClick={onClickDateButton}
                        >
                          3개월
                        </button>
                        <button
                          type="button"
                          className={`member_manage_date_btn${
                            checkButtonActive(-365) ? "_active" : ""
                          }`}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
