import React, { useEffect, useRef, useState } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
// import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAllVideoAsync, VideoManagementActions } from "../redux";
import VideoManagementTable from "./videoManagementDetail/videoManagementTable";
import { Card, CardHeader, CardHeaderToolbar } from "../../../../_metronic/_partials/controls";
import DatePicker from "react-multi-date-picker";

export function VideoManagement({ location }) {
  const dispatch = useDispatch();
  const searchVideoRef = useRef();
  const [date, setDate] = useState();
  // const history = useHistory();
  const userName = location.userName;
  const { refreshVideoList, searchBy, searchText, searchDate, dir } = useSelector(
    (state) => state.videoManagement,
    shallowEqual
  );
  useEffect(() => {
    dispatch(VideoManagementActions.setSelectedVideo(null));
    if (searchVideoRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(VideoManagementActions.refreshVideoList());
        }
      };
      let input = searchVideoRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(VideoManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(VideoManagementActions.sortingChange("dsc"));
    if (userName) {
      dispatch(VideoManagementActions.searchTextChange(userName));
      dispatch(getAllVideoAsync(searchBy, userName, searchDate, dir));
    } else {
      dispatch(getAllVideoAsync(searchBy, searchText, searchDate, dir));
    }
    dispatch(VideoManagementActions.resetPagination());
  }, []);

  useEffect(() => {
    if (refreshVideoList) {
      dispatch(getAllVideoAsync(searchBy, searchText, searchDate, dir));
    }
  }, [dispatch, refreshVideoList, searchBy, searchText, searchDate, dir]);

  const onSearchTextChange = (e) => {
    dispatch(VideoManagementActions.searchTextChange(e.target.value));
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
    <>
      <Card>
        <CardHeader title="Video Management">
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
                      ref={searchVideoRef}
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
        <VideoManagementTable />
      </Card>
    </>
  );
}
