import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@reducers/index";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import * as yup from "yup";
import { authThunks } from "@reducers/slices";

const Login = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(({ AUTH }) => AUTH);
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const onChangeShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("email form isn't correct")
        .required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: () => {
      dispatch(authThunks.postSignThunk(formik.values))
        .unwrap()
        .then((success) => {
          navigate("/main");
        })
        .catch((error) => {
          alert("로그인 실패");
        });
    },
  });

  return (
    <div className="other-layout login">
      <div className="main-content">
        <header className="header">
          <div className="header-inner">
            <h1 className="header-logo">
              <img src="/styles/images/logo-axo-app.png" alt="aso index" />
            </h1>

            {/* <label className="select type-1">
                  <select value={langState} onChange={onSelectLang}>
                    <option value={'ko'}>한국어</option>
                    <option value={'en-US'}>English</option>
                    <option value={'ja'}>日本語</option>
                  </select>
                </label> */}
          </div>
        </header>
        <div className="container">
          <div>
            <div className="manager">
              <h2 className="manager-tit">ASO Index Admin</h2>
              {/* <p className="manager-dsc">{t('Login:Login.SignInToYourAccountToContinue')}</p> */}
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-ipt">
                <div className="form-ipt-tit">E-Mail</div>
                <label className="ipt">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik?.errors?.email && "error"}
                  />
                  {Boolean(formik.errors.email) && (
                    <span className="error-txt">{formik.errors.email}</span>
                  )}
                </label>

                <div className="form-ipt-tit">Password</div>
                <div className="ipt pw">
                  <label>
                    <input
                      type={isShowPassword ? "text" : "password"}
                      className={formik?.errors?.password && "error"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={"비밀번호 입력"}
                    />
                    {Boolean(formik.errors.password) && (
                      <span className="error-txt">
                        {formik.errors.password}
                      </span>
                    )}
                  </label>
                  <div className="pw-show-hide">
                    <input
                      type="checkbox"
                      className="ipt-check eyes"
                      id="checked-1"
                      checked={isShowPassword}
                      onChange={onChangeShowPassword}
                    />
                    <label htmlFor="checked-1">
                      <span className="blind">감추기</span>
                    </label>
                  </div>
                </div>
                {/* <div className="form-help">
                      <div className="save-checked">
                        <input type="checkbox" className="ipt-check basic" id="checked-5" />
                        <label htmlFor="checked-5">{t('Login:Login.UsersSharingPositions')}</label>
                      </div>
                      <button type="button" className="forgot-pw" onClick={handleResetPassword}>
                        로그인
                      </button>
                    </div> */}
              </div>

              <div className="login-btn">
                <button type="submit" className="btn-b pri">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
