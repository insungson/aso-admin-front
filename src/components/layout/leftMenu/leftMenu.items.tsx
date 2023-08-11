import { Fragment, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import * as leftMenuModel from "@models/layout";

const LeftMenuItems = () => {
  const { pathname } = useLocation();
  return (
    <div className="nav-wrap">
      {leftMenuModel.LeftMenuList.sort((a, b) => a.seq - b.seq).map((item) => (
        <Fragment key={item.code}>
          <h2 className="nav-tit">
            <Link to={"#"}></Link>
          </h2>
          <nav className={item.className}>
            {item.children
              .sort((a, b) => a.seq - b.seq)
              .map((child) => (
                <Link
                  key={child.code}
                  to={child.url}
                  className={`${child.className} ${
                    child.url === pathname && "active"
                  }`}
                >
                  {child.name}
                </Link>
              ))}
          </nav>
        </Fragment>
      ))}
    </div>
  );
};

export default memo(LeftMenuItems);
