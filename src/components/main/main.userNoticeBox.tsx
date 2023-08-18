import { useAppDispatch, useAppSelector } from "@reducers/index";

const UserNoticeBox = () => {
  const { userNotice } = useAppSelector(({ MAIN }) => MAIN);

  return (
    <>
      {userNotice.map((item, index) => (
        <div className="score-form" key={index}>
          <div className="main_notice_form">
            <strong className="score-txt-bold">{item.title}</strong>
            <div className="main_notice_btn_div">
              <span
                className="main_notice_btn"
                style={{
                  backgroundColor: `${item.isLive ? "#1dd9a6" : "#cccccc"}`,
                }}
              >
                {item.isLive ? "LIVE" : "완료"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserNoticeBox;
