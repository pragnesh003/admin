/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getRolePermissionAsync } from "../../../../../app/modules/adminManagement/redux";
import { useDispatch } from "react-redux";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const dispatch = useDispatch();
  // const { rolePermissionList } = useSelector(
  //   (state) => state.admin,
  //   shallowEqual
  // );

  useEffect(() => {
    dispatch(getRolePermissionAsync());
  }, []);

  var isEmail = false;
  var isFaq = false;
  var isSiteConfig = false;
  var isUserManagement = false;
  var isHelpCenter = false;
  //var isCountry = false;
  var isCMS = false;
  // var isReport = false;
  var isSubadmin = false;
  // var isHelp = false;
  var isWallet = false;
  var isUserGift = false;
  var isSms = false;
  var isBadge = false;
  var isVideo = false;
  var isDeletedUser = false;
  var isUsers = false;
  var isReportedUser = false;
  var isReportedVideo = false;

  let ls = localStorage.getItem("persist:v706-demo1-auth");
  let data = JSON.parse(ls);
  if (data?.user !== "null") {
    let permission = JSON.parse(data?.user);
    if (
      permission &&
      permission.permissions &&
      permission.permissions.length >= 0
    ) {
      permission.permissions.find((element) => {
        if (element === "email-management-module") {
          isEmail = true;
        } else if (element === "faq-management-module") {
          isFaq = true;
        } else if (element === "site-config-module") {
          isSiteConfig = true;
        } else if (element === "user-management-module") {
          isUserManagement = true;
        } else if (element === "help-center-module") {
          isHelpCenter = true;
        }
        // else if (element === "country-management-module") {
        //   isCountry = true;
        // }
        else if (element === "cms-pages-module") {
          isCMS = true;
        } else if (element === "admin-module") {
          isSubadmin = true;
          // } else if (element === "report-module") {
          //   isReport = true;
        } else if (element === "wallet-module") {
          isWallet = true;
          // } else if (element === "help-module") {
          //   isHelp = true;
        } else if (element === "user-gift-module") {
          isUserGift = true;
        } else if (element === "sms-management-module") {
          isSms = true;
        } else if (element === "badge-module") {
          isBadge = true;
        } else if (element === "video-management-module") {
          isVideo = true;
        } else if (element === "deleted-users-module") {
          isDeletedUser = true;
        } else if (element === "users-module") {
          isUsers = true;
        } else if (element === "reported-users-module") {
          isReportedUser = true;
        } else if (element === "reported-video-module") {
          isReportedVideo = true;
        }
      });
    }
  }

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/dashboard", false)}`}>
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {isSubadmin === true ? (
          <li className={`menu-item ${getMenuItemActive("/admin", false)}`}>
            <NavLink className="menu-link" to="/admin">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
              <span className="menu-text">Admin Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isUsers === true ? (
          <li className={`menu-item menu-item-submenu ${getMenuItemActive("/users-management", true)}`} aria-haspopup="true" data-menu-toggle="hover">
            <NavLink className="menu-link menu-toggle" to="/users-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")} />
              </span>
              <span className="menu-text">Users Management</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <ul className="menu-subnav">
                <ul className="menu-subnav">
                  {isUserManagement === true ? (
                    <li className={`menu-item ${getMenuItemActive("/users-management/users", false)}`} >
                      <NavLink className="menu-link" to="/users-management/users">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Users</span>
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}

                  {isDeletedUser === true ? (
                    <li
                      className={`menu-item ${getMenuItemActive("/users-management/deleted-users", false)}`} >
                      <NavLink className="menu-link" to="/users-management/deleted-users">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Deleted Users</span>
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}
                  {isReportedUser === true ? (
                    <li
                      className={`menu-item ${getMenuItemActive("/users-management/reported-users", false)}`} >
                      <NavLink className="menu-link" to="/users-management/reported-users">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Reported Users</span>
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </ul>
            </div>
          </li>
        ) : (
          ""
        )}

        {isVideo === true ? (
          <li className={`menu-item menu-item-submenu ${getMenuItemActive("/video-management", true)}`} aria-haspopup="true" data-menu-toggle="hover">
            <NavLink className="menu-link menu-toggle" to="/video-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Media/Movie-lane1.svg")} />
              </span>
              <span className="menu-text">Video Management</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu" style={getMenuItemActive("/video-management", true) ? {} : { display: "none" }} >
              <ul className="menu-subnav">
                <ul className="menu-subnav">
                  {isVideo === true ? (
                    <li className={`menu-item ${getMenuItemActive("/video-management/video", false)}`}>
                      <NavLink className="menu-link" to="/video-management/video">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Video Management</span>
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}
                  {isReportedVideo === true ? (
                    <li
                      className={`menu-item ${getMenuItemActive("/video-management/reported-video", false)}`} >
                      <NavLink className="menu-link" to="/video-management/reported-video">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Reported Video</span>
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </ul>
            </div>
          </li>
        ) : (
          ""
        )}



        {/*end::1 Level*/}
        {isUserGift === true ? (
          <li className={`menu-item ${getMenuItemActive("/user-gift", false)}`}>
            <NavLink className="menu-link" to="/user-gift">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Smile.svg")}
                />
              </span>
              <span className="menu-text">User Gifts</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {/*begin::1 Level*/}
        {isWallet === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/wallet-management",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/wallet-management">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Wallet.svg")}
                />
              </span>
              <span className="menu-text">Wallet Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}



        {/* {isHelp === true ? (
          <li
            className={`menu-item ${getMenuItemActive("/help-center", false)}`}
          >
            <NavLink className="menu-link" to="/help-center">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/infoblack.svg"
                  )}
                />
              </span>
              <span className="menu-text">Help Center</span>
            </NavLink>
          </li>
        ) : (
          ""
        )} */}

        {isEmail === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/email-management",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/email-management">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")}
                />
              </span>
              <span className="menu-text">Email Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isSms === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/sms-management",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/sms-management">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")}
                />
              </span>
              <span className="menu-text">SMS Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isBadge === true ? (
          <li className={`menu-item ${getMenuItemActive("/badge", false)}`}>
            <NavLink className="menu-link" to="/badge">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Shield-user.svg")} />
              </span>
              <span className="menu-text">Badge Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isFaq === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/faq-management",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/faq-management">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/custom/information.svg")}
                />
              </span>
              <span className="menu-text">FAQ Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {/* {isCountry === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/country-management",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/country-management">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")}
                />
              </span>
              <span className="menu-text">Country Management</span>
            </NavLink>
          </li>
        ) : (
          ""
        )} */}
        {isCMS === true ? (
          <li className={`menu-item ${getMenuItemActive("/cms-pages", false)}`}>
            <NavLink className="menu-link" to="/cms-pages">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/custom/cms.svg")} />
              </span>
              <span className="menu-text">CMS Pages</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {isSiteConfig === true ? (
          <li
            className={`menu-item ${getMenuItemActive(
              "/site-configuration",
              false
            )}`}
          >
            <NavLink className="menu-link" to="/site-configuration">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                />
              </span>
              <span className="menu-text">Site Configuration</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {/* Help Center */}
        {isHelpCenter === true ? (
          <li
            className={`menu-item ${getMenuItemActive("/help-center", false)}`}
          >
            <NavLink className="menu-link" to="/help-center">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Contact1.svg"
                  )}
                />
              </span>
              <span className="menu-text">Help Center</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {/* {isReport === true ? (
          <li className={`menu-item ${getMenuItemActive("/report", false)}`}>
            <NavLink className="menu-link" to="/report">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Clipboard-list.svg"
                  )}
                />
              </span>
              <span className="menu-text">Repors</span>
            </NavLink>
          </li>
        ) : (
          ""
        )} */}

      </ul>
      {/* end::Menu Nav */}
    </>
  );
}
