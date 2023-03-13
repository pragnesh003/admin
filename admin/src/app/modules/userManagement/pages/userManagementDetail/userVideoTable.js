import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { UserManagementActions, getUserVideoDetailsAsync } from "../../redux";
import { Redirect, useParams } from "react-router-dom";
import { CardHeaderToolbar } from "./../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import BasicPagination from "../../../pagination/BasicPagination";

const UserVideoTable = () => {
    const dispatch = useDispatch();
    const searchRef = useRef();
    const { id } = useParams();
    const { reDirect, isLoading, userVideoList, refreshUserList, searchBy, searchText, dir, skip, limit } = useSelector((state) => state.userManagement, shallowEqual);

    useEffect(() => {
        dispatch(getUserVideoDetailsAsync(id, searchBy, searchText, dir));
    }, []);

    const onPageChange = (currentBatch) => {
        let count = currentBatch ? currentBatch - 1 : skip;
        dispatch(UserManagementActions.setUserBatchNumber(count));
    };

    useEffect(() => {
        if (refreshUserList) {
            dispatch(getUserVideoDetailsAsync(id, searchBy, searchText, dir));
        }
    }, [refreshUserList, searchBy, searchText, dispatch, dir]);

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

    if (reDirect) {
        return <Redirect to="/users-management/users" />;
    }

    return (
        <>
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
                        </div>
                    </form>
                </div>
            </CardHeaderToolbar>
            <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
                <div className="tblmrgn mt-0">
                    <div className="mt-5">
                        <div>
                            <Table hover responsive className="mb-0 default_table with_hoverbtn mrpdng_tbl" >
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>URL</th>
                                        <th>Location</th>
                                        <th>Caption</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userVideoList.records && userVideoList.records.length ? (
                                        userVideoList.records.map((videoLists, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span className="f-w-500">
                                                        {skip * limit + (index + 1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <video className="f-w-500" src={videoLists.url} width="200" height="130" controls />
                                                </td>
                                                <td style={{ width: "40%" }}>
                                                    <span className="f-w-500">{videoLists.location ? videoLists.location : "-"}</span>
                                                </td>
                                                <td>
                                                    <span className="f-w-500">{videoLists.caption ? videoLists.caption : "-"}</span>
                                                </td>
                                                <td>
                                                    <span className="f-w-500">{new Date(videoLists.createdOn).toLocaleDateString()}</span>
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
                                        totalRecords={userVideoList.recordsTotal}
                                        limit={limit}
                                        batch={skip + 1}
                                        onBatchChange={onPageChange}
                                    />
                                </div>
                                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                                    Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                                    {userVideoList.recordsTotal} Records
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserVideoTable;
