export interface IMemberListInfo {
  memberId: string;
  email: string;
  provider: string;
  sessionId: string | null;
  planName: string;
  registerDatetime: string;
  members: number;
  country: string;
}
