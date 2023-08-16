// 사용자 현황 Response 타입
export interface IUserStatus {
  dau: number;
  experiencedUser: number;
  freeUser: number;
  paidUser: number;
}

// 고객 문의 Resposne 타입
export interface ICustomerInquiry {
  paidUserInquiries: number;
  etcInquiries: number;
}

// DAU Response 타입
export interface IDAU {
  date: string;
  total: number;
  experienced: number;
  paid: number;
  free: number;
}

// 사용자 구분 DAU Response 타입
export interface IUserDAU {
  date: string;
  experienced: number;
  paid: number;
  free: number;
}

// 사용자 안내 Response 관리
export interface IUserNotice {
  title: string;
  isLive: boolean;
}
