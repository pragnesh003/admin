import React, { useEffect, useRef, useState } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAllHelpCenterAsync, helpCenterAction } from "../redux";
import HelpCenterTable from "./helpCenterDetail/helpCenterTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import DatePicker from "react-multi-date-picker";

export function HelpCenter() {
  const dispatch = useDispatch();
  const searchHelpCenterRef = useRef();
  const type = "CONTACT";
  const [date, setDate] = useState();
  const { refreshHelpCenterList, searchBy, searchText, searchDate } = useSelector(
    (state) => state.helpCenter,
    shallowEqual
  );
  useEffect(() => {
    dispatch(getAllHelpCenterAsync(searchBy, searchText, searchDate, type));
  }, []);
  useEffect(() => {
    if (refreshHelpCenterList) {
      dispatch(getAllHelpCenterAsync(searchBy, searchText, searchDate, type));
    }
  }, [refreshHelpCenterList, dispatch, searchBy, searchText, searchDate]);

  const onSearchTextChange = (e) => {
    dispatch(helpCenterAction.searchTextChange(e.target.value));
  };

  // Apply date filter
  const onDateChange = (e) => {
    let date = {
      startDate: e[0].toDate().toISOString().slice(0, 10),
      endDate: e.length && e.length === 2 ? e[1].toDate().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
    };
    if (date) {
      dispatch(helpCenterAction.searchDateChange(date));
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
      dispatch(helpCenterAction.searchDateChange(date));
    }
  }

  return (
    <>
      <Card>
        <CardHeader title="Help Center">
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
                      autoComplete="off"
                      onChange={onSearchTextChange}
                      ref={searchHelpCenterRef}
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
        <HelpCenterTable />
      </Card>
    </>
  );
}
