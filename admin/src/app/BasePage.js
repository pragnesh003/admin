import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { UserManagement } from "./modules/userManagement";
import { DashboardPage } from "./pages/DashboardPage";
import { UserManagementDetail } from "./modules/userManagement";
import { EmailManagement } from "./modules/emailManagement";
// import { CountryManagement } from "./modules/countryManagement";

import { ProfileSettings } from "./modules/profileSettings";
import AddTemplate from "./modules/emailManagement/pages/AddTemplate";
// import CreateCountryManagement from "./modules/countryManagement/pages/AddCountry";

import { CmsPages } from "./modules/cmsPages";
import { CmsPageDetail } from "./modules/cmsPages";
import AddNotificationTemplate from "./modules/notificationManagement/pages/AddNotification";
import { NotificationManagement } from "./modules/notificationManagement/pages/notificationManagement";
import { FaqManagement } from "./modules/faqManagement/pages/faqManagement";

import UpdateFAQ from "./modules/faqManagement/pages/updateFAQ";
import { ticketSupportManagement } from "./modules/ticketSupportManagement/pages/ticketSupportManagement";
import { GeneralSettingPages } from "./modules/generalSetting/pages/generalSetting";
import { HelpCenter } from "./modules/helpCenter/pages/helpCenter";
import CreateFaqManagement from "./modules/faqManagement/pages/faqManagementDetail/createFaqManagement";
import { UserGift } from "./modules/userGift";
import { WalletManagement } from "./modules/walletManagement";
import { SiteConfiguration } from "./modules/siteConfiguration";
// import { HelpCenter } from "./modules/helpCenter";
import { Report } from "./modules/report";
import { AdminsManagement } from "./modules/adminManagement";
import UpdateSubAdmin from "./modules/adminManagement/pages/createAdmin";
import { SmsManagement } from "./modules/smsManagement";
import AddSmsTemplate from "./modules/smsManagement/pages/AddTemplate";
import { BadgePages } from "./modules/badge";
import AddBadge from "./modules/badge/pages/addBadge";
import { VideoManagement } from "./modules/videoManagement/pages/videoManagement";
import DeletedUsersTable from "./modules/userManagement/pages/userManagementDetail/deletedUsersTable"
import ReportedUserManagementTable from "./modules/userManagement/pages/userManagementDetail/reportManagement";
import ReportedVideoTable from "./modules/videoManagement/pages/videoManagementDetail/reportedVideoTable";
import UserDetailsView from "./modules/userManagement/pages/userManagementDetail/userDetails";
import BookmarkLocationManagementTable from "./modules/userManagement/pages/userManagementDetail/bookmarkLocationTable";

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute
          path="/dashboard"
          component={DashboardPage}
          title="Dashboard"
        />
        <ContentRoute
          path="/profile-settings"
          component={ProfileSettings}
          title="Profile Settings"
        />
        <ContentRoute
          exact
          path="/users-management/users"
          component={UserManagement}
          title="User Management"
        />
        <ContentRoute
          exact
          path="/admin"
          component={AdminsManagement}
          title="Admin Management"
        />
        <ContentRoute
          exact
          path="/admin/add-admin"
          component={UpdateSubAdmin}
          title="Add Admin"
        />
        <ContentRoute
          exact
          path="/admin/edit-admin/:id"
          component={UpdateSubAdmin}
          title="Update Admin"
        />
        <ContentRoute
          exact
          path="/user-gift"
          component={UserGift}
          title="User Gift"
        />
        {/* <ContentRoute
          exact
          path="/help-center"
          component={HelpCenter}
          title="Help Center"
        /> */}
        <ContentRoute exact path="/report" component={Report} title="Report" />
        <ContentRoute
          exact
          path="/wallet-management"
          component={WalletManagement}
          title="Wallet Management"
        />
        <ContentRoute
          exact
          path="/site-configuration"
          component={SiteConfiguration}
          title="Site Configuration"
        />
        <ContentRoute
          path="/users-management/users/user-management-detail/:id"
          component={UserManagementDetail}
          title="User Detail"
        />
        {/* <ContentRoute
          exact
          path="/country-management"
          component={CountryManagement}
          title="Country Management"
        />
        <ContentRoute
          exact
          path="/country-management/add-country"
          component={CreateCountryManagement}
          title="Add Country"
        />
        <ContentRoute
          exact
          path="/country-management/edit-country/:id"
          component={CreateCountryManagement}
          title="Update Country"
        /> */}
        <ContentRoute
          exact
          path="/email-management"
          component={EmailManagement}
          title="Email Management"
        />
        <ContentRoute
          exact
          path="/email-management/add-template"
          component={AddTemplate}
          title="Add Email"
        />
        <ContentRoute
          exact
          path="/email-management/edit-template/:id"
          component={AddTemplate}
          title="Update Email"
        />
        <ContentRoute
          exact
          path="/notification-management"
          component={NotificationManagement}
          title="Notification Management"
        />
        <ContentRoute
          exact
          path="/notification-management/add-template"
          component={AddNotificationTemplate}
          title="Add Notification Template"
        />
        <ContentRoute
          exact
          path="/notification-management/edit-template/:id"
          component={AddNotificationTemplate}
          title="Update Notification Template"
        />
        <ContentRoute
          exact
          path="/cms-pages"
          component={CmsPages}
          title="CMS Management"
        />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
          title="Update CMS Detail"
        />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
          title="Update CMS Detail"
        />
        <ContentRoute
          exact
          path="/faq-management"
          component={FaqManagement}
          title="FAQ Management"
        />
        <ContentRoute
          exact
          path="/faq-management/add-faq"
          component={CreateFaqManagement}
          title="Add FAQ"
        />
        <ContentRoute
          exact
          path="/faq-management/edit-faq"
          component={UpdateFAQ}
          title="Update FAQ"
        />
        <ContentRoute
          exact
          path="/ticket-support-management"
          component={ticketSupportManagement}
          title="Ticket Support Management"
        />
        <ContentRoute
          exact
          path="/general-setting"
          component={GeneralSettingPages}
          title="General Setting"
        />
        <ContentRoute
          exact
          path="/help-center"
          component={HelpCenter}
          title="Help Center"
        />
        <ContentRoute
          exact
          path="/sms-management"
          component={SmsManagement}
          title="SMS Management"
        />
        <ContentRoute
          exact
          path="/sms-management/add-template"
          component={AddSmsTemplate}
          title="Add SMS Template"
        />
        <ContentRoute
          exact
          path="/sms-management/edit-template/:id"
          component={AddSmsTemplate}
          title="Update SMS Template"
        />
        <ContentRoute
          exact
          path="/badge"
          component={BadgePages}
          title="Badge Management"
        />
        <ContentRoute
          exact
          path="/badge/add-badge"
          component={AddBadge}
          title="Add Badge"
        />
        <ContentRoute
          exact
          path="/badge/edit-badge/:id"
          component={AddBadge}
          title="Update Badge"
        />
        <ContentRoute
          exact
          path="/users-management/users/user-report-list/:id"
          component={ReportedUserManagementTable}
          title="Report List"
        />
        <ContentRoute
          exact
          path="/video-management/video"
          component={VideoManagement}
          title="Video Management"
        />
        <ContentRoute
          exact
          path="/video-management/video/video-reported-user-list/:id"
          component={ReportedVideoTable}
          title="Video Reported User List"
        />
        <ContentRoute
          exact
          path="/users-management/deleted-users"
          component={DeletedUsersTable}
          title="Deleted User List"
        />
        <ContentRoute
          exact
          path="/users-management/reported-users"
          component={ReportedUserManagementTable}
          title="Reported User List"
        />
        <ContentRoute
          exact
          path="/video-management/reported-video"
          component={ReportedVideoTable}
          title="Reported Video List"
        />
        <ContentRoute
          exact
          path="/users-management/users/user-details/:id"
          component={UserDetailsView}
          title="User Details"
        />
        <ContentRoute
          exact
          path="/users-management/users/bookmark-location/:id"
          component={BookmarkLocationManagementTable}
          title="User Bookmark Location"
        />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
