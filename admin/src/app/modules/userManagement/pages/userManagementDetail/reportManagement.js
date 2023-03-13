import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import { getAllReportedUserListAsync, getUserReportListAsync, UserManagementActions } from "../../redux";
import { Card, CardHeader, CardHeaderToolbar } from "../../../../../_metronic/_partials/controls";
import BasicPagination from "../../../pagination/BasicPagination";
import { useParams, useLocation } from 'react-router-dom';
import { CircularProgress } from "@material-ui/core";
import DatePicker from "react-multi-date-picker";

const ReportedUserManagementTable = () => {
    const dispatch = useDispatch();
    const searchRef = useRef();
    const { id } = useParams();
    const { isLoading, reportList, refreshAllReportedUserList, refreshUserList, skip, limit, searchBy, searchText, dir, searchDate } = useSelector(
        (state) => state.userManagement,
        shallowEqual
    );
    const location = useLocation();
    const route = location.pathname;
    const [date, setDate] = useState();

    useEffect(() => {
        removeFilter();
        dispatch(UserManagementActions.setUserBatchNumber(0));
        dispatch(UserManagementActions.setUserPageLimit(10));
        if (id) {
            dispatch(getUserReportListAsync(id, searchBy, searchText, dir));
        } else {
            dispatch(getAllReportedUserListAsync(searchBy, searchText, dir));
        }
    }, []);

    useEffect(() => {
        removeFilter();
        if (id) {
            dispatch(getUserReportListAsync(id, searchBy, searchText, dir));
        } else {
            dispatch(getAllReportedUserListAsync(searchBy, searchText, dir));
        }
    }, [route]);

    useEffect(() => {
        if (refreshUserList) {
            if (id) {
                dispatch(getUserReportListAsync(id, searchBy, searchText, searchDate, dir));
            } else {
                dispatch(getAllReportedUserListAsync(searchBy, searchText, searchDate, dir));
            }
        }
    }, [refreshAllReportedUserList, refreshUserList, searchBy, searchText, dispatch, dir, searchDate]);

    useEffect(() => {
        dispatch(UserManagementActions.setSelectedUser(null));
        if (searchRef.current) {
            let keyPressEvent = (e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    dispatch(UserManagementActions.refreshUserList());
                }
            };
            let input = searchRef.current;
            input.addEventListener("keyup", keyPressEvent);

            return () => {
                input.removeEventListener("keyup", keyPressEvent);
                dispatch(UserManagementActions.searchTextChange(""));
                input.value = "";
            };
        }
    }, [dispatch]);

    const onSearchTextChange = (e) => {
        dispatch(UserManagementActions.searchTextChange(e.target.value));
    };

    const onPageChange = (currentBatch) => {
        let count = currentBatch ? currentBatch - 1 : skip;
        dispatch(UserManagementActions.setUserBatchNumber(count));
    };

    // Apply date filter
    const onDateChange = (e) => {
        let date = {
            startDate: e[0].toDate().toISOString().slice(0, 10),
            endDate: e.length && e.length === 2 ? e[1].toDate().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
        };
        if (date) {
            dispatch(UserManagementActions.searchDateChange(date));
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
            dispatch(UserManagementActions.searchDateChange(date));
        }
    }

    return (
        <Card>
            <CardHeader title={
                <>
                    <div className="form-group m-0 d-flex align-items-center">
                        {!id &&
                            <>
                                <span className="pl-2">Reported Users</span>
                            </>
                        }
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
                                        <th>Who Reported</th>
                                        <th>Whose Reported</th>
                                        <th>Message</th>
                                        <th>Reported On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportList.records && reportList.records.length ? (
                                        reportList.records.map((reportLists, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <span className="f-w-500">
                                                            {0 + (index + 1)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="f-w-500">{reportLists.fromUserName}</span>
                                                    </td>
                                                    <td>
                                                        <span className="f-w-500">{reportLists.toUserName}</span>
                                                    </td>
                                                    <td>{reportLists.message}</td>
                                                    <td>{new Date(reportLists.createdOn).toLocaleDateString()}</td>
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
                                        totalRecords={reportList.recordsTotal}
                                        limit={limit}
                                        batch={skip + 1}
                                        onBatchChange={onPageChange}
                                    />
                                </div>
                                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                                    Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                                    {reportList.recordsTotal} Records
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card >
    );


};

export default ReportedUserManagementTable;
