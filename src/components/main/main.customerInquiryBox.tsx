const CustomerInquiryBox = () => {
  return (
    <div className="main-nav-right">
      <header>고객문의</header>
      <div className="inquiry-box">
        <div>
          <span>유료 구독자 문의</span>
          <span>{3}건</span>
        </div>
        <div>
          <span>기타 문의</span>
          <span>{20}건</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInquiryBox;
