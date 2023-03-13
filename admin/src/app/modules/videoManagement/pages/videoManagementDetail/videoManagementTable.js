import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { VideoManagementActions, deleteVideoAsync } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

const VideoManagementTable = () => {
  const { isLoading, videoList, skip, limit, dir, searchBy } = useSelector((state) => state.videoManagement, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedVideo, setselectedVideo] = useState({});
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(VideoManagementActions.setVideoBatchNumber(count));
  };

  const onVideoReportDetailsClick = (video) => {
    history.push(`/video-management/video/video-reported-user-list/${video._id}`);
  }

  const onDeleteClick = (video) => {
    setselectedVideo(video);
    deleteShow();
  };
  const onDeactiveClick = () => {
    dispatch(deleteVideoAsync(selectedVideo._id));
    setselectedVideo({});
    deleteClose();
  };

  const onSortingClick = (sortBy, sortType) => {
    dispatch(VideoManagementActions.searchByChange(sortBy));
    dispatch(VideoManagementActions.sortingChange(sortType));
  }

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
                  <th width="60px">Sr No.</th>
                  <th style={{ width: "10%" }}>User Name</th>
                  <th>URL</th>
                  <th style={{ width: "10%" }}>Category</th>
                  <th style={{ width: "30%" }}>Location</th>
                  <th style={{ width: "15%" }}>Caption</th>
                  {/* <th onClick={console.log("Work")}>Uploaded On</th> */}
                  <th width="140px" style={{ cursor: "pointer" }} onClick={() => onSortingClick("createdOn", dir === "" || dir === "dsc" ? "asc" : "dsc")}>
                    Uploaded On{" "}
                    <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
                      {dir === "dsc" ? (
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Down-2.svg")} />
                      ) : (
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Up-2.svg")} />
                      )}
                    </span>
                  </th>
                  <th width="120px">Action</th>
                </tr>
              </thead>
              <tbody>
                {videoList.records && videoList.records.length ? (
                  videoList.records.map((videoLists, index) => (
                    <tr key={index}>
                      <td>
                        <span className="f-w-500">
                          {skip * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{videoLists.userName}</span>
                      </td>
                      <td>
                        <video className="f-w-500" src={videoLists.url} width="200" height="130" controls />
                      </td>
                      <td>
                        <span className="f-w-500">{videoLists.category}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{videoLists.location ? videoLists.location : "-"}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{videoLists.caption ? videoLists.caption : "-"}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{new Date(videoLists.createdOn).toUTCString()}</span>
                      </td>
                      <td>
                        <button title="Reported User" className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3" onClick={() => onVideoReportDetailsClick(videoLists)} >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Clipboard-list.svg")} />
                          </span>
                        </button>
                        <button title="Delete" className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => onDeleteClick(videoLists)} >
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
                  totalRecords={videoList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {videoList.recordsTotal} Records
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

export default VideoManagementTable;
