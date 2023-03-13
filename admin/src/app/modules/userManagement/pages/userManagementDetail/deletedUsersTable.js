import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import { getDeletedUserListAsync } from "../../redux";
import { Card, CardHeader, CardHeaderToolbar } from "../../../../../_metronic/_partials/controls";
import { UserManagementActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { CircularProgress } from "@material-ui/core";

const DeletedUsersTable = () => {

  const dispatch = useDispatch();
  const searchRef = useRef();

  const { isLoading, deletedUserList, refreshUserList, skip, limit, searchBy, searchText, dir } = useSelector(
    (state) => state.userManagement,
    shallowEqual
  );

  useEffect(() => {
    dispatch(UserManagementActions.setUserBatchNumber(0));
    dispatch(UserManagementActions.setUserPageLimit(10));
    dispatch(getDeletedUserListAsync(searchBy, searchText, dir));
  }, []);
  useEffect(() => {
    if (refreshUserList) {

      dispatch(getDeletedUserListAsync(searchBy, searchText, dir));
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

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(UserManagementActions.setUserBatchNumber(count));
  };

  return (
    <Card>
      <CardHeader title={
        <>
          <div className="form-group m-0 d-flex align-items-center">
            <span className="pl-2">Deleted Users List</span>
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
                    <th>Deleted User</th>
                    <th>Deleted By</th>
                    <th>Reasons</th>
                    <th>Deleted On</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedUserList.records && deletedUserList.records.length ? (
                    deletedUserList.records.map((deletedUserLists, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="f-w-500">
                              {0 + (index + 1)}
                            </span>
                          </td>
                          <td>
                            <span className="f-w-500">{deletedUserLists.userName}</span>
                          </td>
                          <td>
                            <span className="f-w-500">{deletedUserLists.deletedByUserName} ({deletedUserLists.deletedUserRole === "USER" ? "Self" : deletedUserLists.deletedUserRole.charAt(0).toUpperCase() + deletedUserLists.deletedUserRole.slice(1).toLowerCase()})</span>
                          </td>
                          <td>{deletedUserLists.deletedReason}</td>
                          <td>{new Date(deletedUserLists.deletedDate).toLocaleDateString()}</td>
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
                    totalRecords={deletedUserList.recordsTotal}
                    limit={limit}
                    batch={skip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                  Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                  {deletedUserList.recordsTotal} Records
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card >
  );


};

export default DeletedUsersTable;
