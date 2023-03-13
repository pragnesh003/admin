import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import AddBadge from "../addBadge";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../../_metronic/_partials/controls";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export const BadgePageDetail = () => {
  const { selectedBadge, reDirect } = useSelector(
    (state) => state.badge,
    shallowEqual
  );

  return (
    <>
      <Card>
        <CardHeader
          title={
            <>
              <div className="form-group m-0 d-flex align-items-center">
                <Link className="btn btn-link px-0" to="/badge-pages">
                  <SVG
                    className="h-50 align-self-center"
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Arrow-left.svg"
                    )}
                  />
                  Back
                </Link>
                <span className="pl-2">
                  {selectedBadge._id ? "Edit Badge" : "Add Badge"}
                </span>
              </div>
            </>
          }
        ></CardHeader>
        <CardBody>
          <AddBadge selectedBadge={selectedBadge} reDirect={reDirect} />
        </CardBody>
      </Card>
    </>
  );
};
