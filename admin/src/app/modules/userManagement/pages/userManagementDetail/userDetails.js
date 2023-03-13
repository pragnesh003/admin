import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Card, CardBody, CardHeader, } from "../../../../../_metronic/_partials/controls";
import UserProfileView from "./userProfile";
import ReportedUserManagementTable from "./reportManagement";
import BookmarkLocationManagementTable from "./bookmarkLocationTable";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { Link } from "react-router-dom";

const UserDetailsView = () => {
  const [selectedTab, setSelectedTab] = useState("basic-details");
  const handleSelect = (key) => {
    setSelectedTab(key);
  };
  return (
    <>
      <Card>

        <CardHeader title={
          <div className="form-group m-0 d-flex align-items-center">
            <Link className="btn btn-link px-0" to="/users-management/users">
              <SVG className="h-50 align-self-center" src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")} />
              Back
            </Link>
            <span className="pl-2">User Profile</span>
          </div>
        }></CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="basic-details"
            id="OrderManagementTab"
            className="def_tab"
            onSelect={handleSelect}
          >
            <Tab eventKey="basic-details" title="Basic Details">
              <div className="p-6">
                {selectedTab === "basic-details" && <UserProfileView selectedTab={selectedTab} />}
              </div>
            </Tab>

            <Tab eventKey="reported-users" title="Reported Users">
              <div className="p-6">
                {selectedTab === "reported-users" && <ReportedUserManagementTable selectedTab={selectedTab} />}
              </div>
            </Tab>

            <Tab eventKey="bookmark-location" title="Bookmark Location">
              <div className="p-6">
                {selectedTab === "bookmark-location" && <BookmarkLocationManagementTable selectedTab={selectedTab} />}
              </div>
            </Tab>

          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
export default UserDetailsView;