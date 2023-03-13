import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import { getReportedVideoAsync, VideoManagementActions, getAllVideoReportUserListAsync } from "../../redux";
import { Card, CardHeader, CardHeaderToolbar } from "../../../../../_metronic/_partials/controls";
import BasicPagination from "../../../pagination/BasicPagination";
import { useParams, useLocation, Link } from 'react-router-dom';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { CircularProgress } from "@material-ui/core";
import DatePicker from "react-multi-date-picker";

const ReportedVideoTable = () => {

  const dispatch = useDispatch();
  const searchRef = useRef();
  const { id } = useParams();
  const location = useLocation();
  const route = location.pathname;
  const [date, setDate] = useState({});

  const { reportedVideoList, refreshVideoList, isLoading, searchBy, searchText, dir, skip, limit, searchDate } = useSelector((state) => state.videoManagement, shallowEqual);
  useEffect(() => {
    removeFilter();
    dispatch(VideoManagementActions.resetPagination());
    if (id) {
      dispatch(getAllVideoReportUserListAsync(id, searchBy, searchText, searchDate));
    } else {
      dispatch(getReportedVideoAsync(searchBy, searchText, searchDate, dir));
    }
  }, []);

  useEffect(() => {
    removeFilter();
    dispatch(VideoManagementActions.resetPagination());
    if (id) {
      dispatch(getAllVideoReportUserListAsync(id, searchBy, searchText, searchDate));
    } else {
      dispatch(getReportedVideoAsync(searchBy, searchText, searchDate, dir));
    }
  }, [route]);

  useEffect(() => {
    if (refreshVideoList) {
      if (id) {
        dispatch(getAllVideoReportUserListAsync(id, searchBy, searchText, searchDate));
      } else {
        dispatch(getReportedVideoAsync(searchBy, searchText, searchDate, dir));
      }
    }
  }, [refreshVideoList, searchBy, searchText, dispatch, dir, searchDate]);

  useEffect(() => {
    if (searchRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(VideoManagementActions.refreshVideoList());
        }
      };
      let input = searchRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(VideoManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);

  const onSearchTextChange = (e) => {
    dispatch(VideoManagementActions.searchTextChange(e.target.value));
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(VideoManagementActions.setVideoBatchNumber(count));
  };

  // Apply date filter
  const onDateChange = (e) => {
    let date = {
      startDate: e[0].toDate().toISOString().slice(0, 10),
      endDate: e.length && e.length === 2 ? e[1].toDate().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
    };
    if (date) {
      dispatch(VideoManagementActions.searchDateChange(date));
    }
  };

  // Remove calendar filter
  const removeFilter = () => {
    let date = {
      startDate: undefined,
      endDate: undefined
    };
    setDate({});
    // datePickerRef.current.closeCalendar()
    if (date) {
      dispatch(VideoManagementActions.searchDateChange(date));
    }
  }

  return (
    <Card>
      <CardHeader title={
        <>
          <div className="form-group m-0 d-flex align-items-center">
            {id && <Link className="btn btn-link px-0" to="/video-management/video">
              <SVG className="h-50 align-self-center" src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")} />
              Back
            </Link>}
            <span className="pl-2">Reported Video List</span>
          </div>
        </>
      }
      >
        <CardHeaderToolbar>
          <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
            <form
              className="subheader_filter"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-row">
                <div className="form-group mr-3 mb-1">
                  <input
                    name="Search"
                    placeholder="Search. . ."
                    type="text"
                    className="form-control"
                    value={searchText}
                    onChange={onSearchTextChange}
                    ref={searchRef}
                  />
                </div>
                <div className="form-group">
                  <DatePicker placeholder="Date Filter" style={{ height: '48px' }} format="DD/MM/YYYY" onChange={onDateChange} maxDate={new Date()} range value={date} >
                    <button className="btn_new btn-sm mb-3" type="button" onClick={removeFilter} > Clear </button>
                  </DatePicker>
                </div>
              </div>
            </form>
          </div>
        </CardHeaderToolbar>
      </CardHeader>
      <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
        <div className="tblmrgn mt-0">
          <div className="mt-5">
            <div>
              <Table hover responsive id="myTable" className="mb-0 default_table with_hoverbtn mrpdng_tbl" >
                <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th>Created By</th>
                    <th>Video</th>
                    <th>Reported By</th>
                    <th>Reason</th>
                    <th>Reported On</th>
                  </tr>
                </thead>
                <tbody>
                  {reportedVideoList.records && reportedVideoList.records.length ? (
                    reportedVideoList.records.map((videoReportUserLists, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="f-w-500">
                              {0 + (index + 1)}
                            </span>
                          </td>
                          <td>
                            <span className="f-w-500">{videoReportUserLists.uploaderName}</span>
                          </td>
                          <td>
                            {/* <span className="f-w-500">{videoReportUserLists.url}</span> */}
                            <video className="f-w-500" src={videoReportUserLists.url} width="200" height="130" controls />
                          </td>
                          <td>
                            <span className="f-w-500">{videoReportUserLists.reportUserName}</span>
                          </td>
                          <td>
                            <span className="f-w-500">{videoReportUserLists.reportReason}</span>
                          </td>
                          <td>
                            <span className="f-w-500">{new Date(videoReportUserLists.reportDate).toLocaleDateString()}</span>
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
                      <td colSpan={7} className="text-center">
                        <div className="basic-verification-loader text-center">
                          {<CircularProgress />}
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
                    totalRecords={reportedVideoList.recordsTotal}
                    limit={limit}
                    batch={skip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                  Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                  {reportedVideoList.recordsTotal} Records
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card >
  );


};

export default ReportedVideoTable;
