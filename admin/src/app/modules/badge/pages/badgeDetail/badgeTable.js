import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { BadgeActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { deleteBadgeAsync } from "../../redux/badgeApi";

const BadgeTable = () => {
  const { isLoading, badgeList, skip, limit } = useSelector(
    (state) => state.badge,
    shallowEqual
  );
  const history = useHistory();
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  const dispatch = useDispatch();
  const [selectedBadgeName, setselectedBadgeName] = useState({});
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(BadgeActions.setBadgeBatchNumber(count));
  };
  const onEditClick = (badge) => {
    dispatch(BadgeActions.setSelectedBadge(badge));
    history.push(`/badge/edit-badge/${badge?._id}`);
  };
  const onDeleteClick = (badgeLists) => {
    setselectedBadgeName(badgeLists);
    deleteShow();
  };
  const onDeactiveClick = () => {
    dispatch(deleteBadgeAsync(selectedBadgeName._id));
    setselectedBadgeName({});
    deleteClose();
  };

  return (
    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
      <div className="tblmrgn mt-0">
        <div className="mt-5">
          <div>
            <Table
              hover
              responsive
              className="mb-0 default_table with_hoverbtn mrpdng_tbl"
            >
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Day Validity</th>
                  <th>Per Day Post</th>
                  <th width="120px">Action</th>
                </tr>
              </thead>
              <tbody>
                {badgeList.records && badgeList.records.length ? (
                  badgeList.records.map((badgeLists, index) => (
                    <tr key={index}>
                      <td>
                        <span className="f-w-500">
                          {skip * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{badgeLists.title}</span>
                      </td>
                      <td>
                        <img src={badgeLists.image} height={70} width={70} />
                      </td>
                      <td>
                        <span className="f-w-500">{badgeLists.description}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{badgeLists.dayValidity}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{badgeLists.perDayPost}</span>
                      </td>

                      <td>
                        <button
                          title="Edit"
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                          onClick={() => onEditClick(badgeLists)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Write.svg"
                              )}
                            />
                          </span>
                        </button>
                        <button title="Delete" className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => onDeleteClick(badgeLists)} >
                          <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center">
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
                  totalRecords={badgeList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {badgeList.recordsTotal} Records
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
              Are you sure want you to delete?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button
                type="button"
                className="btn_new btn-sm mr-3"
                onClick={deleteClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn_new btn-sm"
                onClick={onDeactiveClick}
              >
                Yes, Delete
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BadgeTable;
