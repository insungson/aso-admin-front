export interface ILeftMenu extends ILeftMenuChildren {
  children: ILeftMenuChildren[];
}

export interface ILeftMenuChildren {
  code: string;
  name: string;
  url: string;
  seq: number;
  className: string;
}
