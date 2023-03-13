import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import BasicDetailsForm from "./basicDetailsForm";
import {
  Card,
  CardBody,
  CardHeader,
} from "./../../../../../_metronic/_partials/controls";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export function UserManagementDetail() {
  const { selectedUser, isLoading, reDirect } = useSelector(
    (state) => state.userManagement,
    shallowEqual
  );

  return (
    <>
      <Card>
        <CardHeader
          title={
            <>
              <div className="form-group m-0 d-flex align-items-center">
                <Link className="btn btn-link px-0" to="/users-management/users">
                  <SVG
                    className="h-50 align-self-center"
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Arrow-left.svg"
                    )}
                  />
                  Back
                </Link>
                <span className="pl-2">{selectedUser.name}</span>
              </div>
            </>
          }
        ></CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="basic-details"
            id="UserManagementTab"
            className="def_tab"
          >
            <Tab eventKey="basic-details" title="Basic Details">
              <BasicDetailsForm
                selectedUser={selectedUser}
                isLoading={isLoading}
                reDirect={reDirect}
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}
