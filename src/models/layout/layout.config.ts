import { ILeftMenu } from "./index";

export const LeftMenuList: ILeftMenu[] = [
  {
    code: "member",
    name: "member",
    url: "",
    seq: 0,
    className: "nav-app",
    children: [
      {
        code: "member",
        name: "member",
        url: "/member",
        seq: 0,
        className: "",
      },
      {
        code: "subscribe",
        name: "subscribe",
        url: "/subscribe",
        seq: 0,
        className: "",
      },
      {
        code: "cancle",
        name: "cancle",
        url: "/cancle",
        seq: 0,
        className: "",
      },
    ],
  },
  {
    code: "manage",
    name: "manage",
    url: "",
    seq: 0,
    className: "nav-app",
    children: [
      {
        code: "notice",
        name: "notice",
        url: "/notice",
        seq: 0,
        className: "",
      },
      {
        code: "inquiry",
        name: "inquiry",
        url: "/inquiry",
        seq: 0,
        className: "",
      },
    ],
  },
];
