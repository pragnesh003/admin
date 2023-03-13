import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import { CircularProgress, FormControlLabel, Switch } from "@material-ui/core";
import { UserManagementActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { deleteUserAsync, updateUserStatusAsync } from "../../redux";
import { useHistory, Link } from "react-router-dom";

const UserManagementTable = ({ onUserDetailsClick }) => {
  const [DeleteModal, setDeleteModal] = useState(false);
  const [reason, setReason] = useState("");
  const deleteClose = () => {
    setDeleteModal(false)
    setReason("")
  };
  const deleteShow = () => setDeleteModal(true);
  const history = useHistory();
  const [selectedID, setSelectedID] = useState();
  const dispatch = useDispatch();

  const { isLoading, userList, skip, limit, dir, searchBy } = useSelector(
    (state) => state.userManagement,
    shallowEqual
  );

  const onDeleteClick = (id) => {
    setSelectedID(id);
    deleteShow();
  };

  const onDeactiveClick = () => {
    dispatch(deleteUserAsync(selectedID._id, { reason: reason }));
    setSelectedID({});
    deleteClose();
  };

  // const onActivateClick = (userLists) => {
  //   dispatch(deleteUserAsync(userLists._id));
  // };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(UserManagementActions.setUserBatchNumber(count));
  };

  const handleSort = (column, dir) => {
    dispatch(UserManagementActions.setSort({ column, dir }));
  };

  // const onUserReportDetailsClick = (user) => {
  //   history.push(`/users-management/users/user-report-list/${user._id}`);
  // }

  const onUserDetailsViewClick = (user) => {
    history.push(`/users-management/users/user-details/${user._id}`);
  }


  // Change user status Function
  const updateUserStatusClick = (event, userDetail) => {
    let status = "inactive";
    if (event.target.checked) {
      status = "active";
    }
    dispatch(updateUserStatusAsync(userDetail._id, { status: status }))
  };

  return (
    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
      <div className="tblmrgn mt-0">
        <div className="mt-5">
          <div>
            <Table
              hover
              responsive
              id="myTable"
              className="mb-0 default_table with_hoverbtn mrpdng_tbl"
            >
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th
                    onClick={() =>
                      handleSort(
                        "userName",
                        dir === "" || dir === "dsc" ? "asc" : "dsc"
                      )
                    }
                  >
                    User Name{" "}
                    {dir !== "" && searchBy === "userName" && (
                      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
                        {dir === "dsc" ? (
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Navigation/Down-2.svg"
                            )}
                          />
                        ) : (
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Navigation/Up-2.svg"
                            )}
                          />
                        )}
                      </span>
                    )}
                  </th>
                  <th>Mobile No</th>
                  <th>Date of Birth</th>
                  <th>Streaks</th>
                  <th>Status</th>
                  <th className="wd-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.records && userList.records.length ? (
                  userList.records.map((userLists, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span className="f-w-500">
                            {skip * limit + (index + 1)}
                          </span>
                        </td>
                        <td>
                          {/* <span className="f-w-500">{userLists.userName}</span> */}
                          <Link className="link" to={{ pathname: "/video-management/video", userName: userLists.userName }} >{userLists.userName}</Link>
                        </td>
                        <td>
                          {userLists.mobileDetails
                            ? userLists.mobileDetails.dailCode +
                            "_" +
                            userLists.mobileDetails.mobileNo
                            : "-"}
                        </td>
                        <td>{userLists.dob}</td>
                        <td>
                          <span>{userLists.streaks ? userLists.streaks : 0}</span>
                        </td>
                        <td>
                          <div>
                            <FormControlLabel
                              control={
                                <Switch checked={userLists.status && (userLists.status === "ACTIVE" || userLists.status === "active") ? true : false} onChange={(e) => updateUserStatusClick(e, userLists)} color="primary" name="status" />
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                            onClick={() => onUserDetailsClick(userLists)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              />
                            </span>
                          </button>
                          <button
                            title="Delete"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm mr-3"
                            onClick={() => onDeleteClick(userLists)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/General/Trash.svg"
                                )}
                              />
                            </span>
                          </button>
                          {/* <button title="Report" className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3" onClick={() => onUserReportDetailsClick(userLists)} >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Clipboard-list.svg")}
                              />
                            </span>
                          </button> */}
                          <button title="View User Details" className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3" onClick={() => onUserDetailsViewClick(userLists)} >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG src={toAbsoluteUrl("/media/svg/icons/custom/eye.svg")}
                              />
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center p-0 border-0">
                      <div className="basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {!isLoading && (
            <div className="row d-flex align-items-center mr-5 ml-5 mt-4">
              <div className="col-md-8 text-right mb-5 aspgntn">
                <BasicPagination
                  totalRecords={userList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {userList.recordsTotal} Records
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={DeleteModal}
        onHide={deleteClose}
        centered
        className="def_modal delete_modal"
      >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure want to delete?
            </p>
            <textarea
              placeholder="Enter Content"
              type="text"
              rows="3"
              name="smsContent"
              className="form-control re_inputRouded"
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={deleteClose}
                >
                  Close
                </button>
              </div>
              {reason && reason !== "" ? <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={onDeactiveClick}
                >
                  Yes, Delete
                </button>
              </div> : ""}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div >
  );
};

export default UserManagementTable;
