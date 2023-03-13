import { combineReducers } from "redux";
import * as auth from "../app/modules/Auth/redux/authReducer";
import * as environnment from "../app/modules/GetEnvironment/getEnvironmentReducer";
import * as userManagement from "../app/modules/userManagement/redux";
import * as emailManagement from "../app/modules/emailManagement/redux";
import * as countryManagement from "../app/modules/countryManagement/redux";
import * as profile from "../app/modules/profileSettings/redux";
import * as dashboard from "../app/modules/dashboards/redux";
import * as notificationManagement from "../app/modules/notificationManagement/redux";
import * as cms from "../app/modules/cmsPages/redux";
import * as faqManagement from "../app/modules/faqManagement/redux";
// import * as whitelistManagement from "../app/modules/whitelist_management/redux";
import snackBarReducer from "../app/modules/snackBar/snackbarReducer";
import * as ticketsAndSupport from "../app/modules/ticketSupportManagement/redux";
import * as generalSetting from "../app/modules/generalSetting/redux";
// import * as clubManagement from "../app/modules/club_management/redux"
// import * as contactUs from "../app/modules/contactUs/redux";
import * as siteConfiguration from "../app/modules/siteConfiguration/redux";
import * as AdminsManagement from "../app/modules/adminManagement/redux";
import * as SmsManagement from "../app/modules/smsManagement/redux";
import * as Badge from "../app/modules/badge/redux";
import * as helpCenter from "../app/modules/helpCenter/redux";
import * as VideoManagement from "../app/modules/videoManagement/redux";

export const rootReducer = combineReducers({
  snackBar: snackBarReducer,
  environnment: environnment.reducer,
  dashboard: dashboard.reducer,
  auth: auth.reducer,
  userManagement: userManagement.reducer,
  emailManagement: emailManagement.reducer,
  countryManagement: countryManagement.reducer,
  faqManagement: faqManagement.reducer,
  // whitelistManagement: whitelistManagement.reducer,
  notificationManagement: notificationManagement.reducer,
  profile: profile.reducer,
  cms: cms.reducer,
  generalSetting: generalSetting.reducer,
  ticketsAndSupport: ticketsAndSupport.reducer,
  // clubManagement: clubManagement.reducer,
  // contactUs: contactUs.reducer,
  helpCenter: helpCenter.reducer,
  site: siteConfiguration.reducer,
  admin: AdminsManagement.reducer,
  smsManagement: SmsManagement.reducer,
  badge: Badge.reducer,
  videoManagement: VideoManagement.reducer,
});
