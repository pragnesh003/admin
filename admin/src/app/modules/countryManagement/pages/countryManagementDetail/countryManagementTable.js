import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { CountryManagementActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { deleteCountryAsync } from "../../redux/countryManagementApi";

const CountryManagementTable = () => {
  const { isLoading, countryList, skip, limit } = useSelector(
    (state) => state.countryManagement,
    shallowEqual
  );

  const history = useHistory();
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  const dispatch = useDispatch();
  const [selectedCountryName, setselectedCountryName] = useState({});
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(CountryManagementActions.setCountryBatchNumber(count));
  };
  const onEditClick = (country) => {
    dispatch(CountryManagementActions.setSelectedCountry(country));
    history.push(`/country-management/edit-country/${country?._id}`);
  };
  const onDeleteClick = (countryLists) => {
    setselectedCountryName(countryLists);
    deleteShow();
  };
  const onDeactiveClick = () => {
    dispatch(deleteCountryAsync(selectedCountryName._id));
    setselectedCountryName({});
    deleteClose();
  };
  const onActivateClick = (countryLists) => {
    dispatch(deleteCountryAsync(countryLists._id));
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
                  <th>Flag</th>
                  <th>Name</th>
                  <th>Char</th>
                  <th width="120px">Action</th>
                </tr>
              </thead>
              <tbody>
                {countryList.records && countryList.records.length ? (
                  countryList.records.map((countryLists, index) => (
                    <tr key={index}>
                      <td>
                        <span className="f-w-500">
                          {skip * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span>
                          <img
                            className="clubImage"
                            src={countryLists?.flag}
                            alt="Country"
                          ></img>
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{countryLists.name}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{countryLists.char}</span>
                      </td>
                      <td>
                        <button
                          title="Edit"
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                          onClick={() => onEditClick(countryLists)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Write.svg"
                              )}
                            />
                          </span>
                        </button>
                        {countryLists.status === "ACTIVE" ? (
                          <button
                            title="Delete"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => onDeleteClick(countryLists)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/General/Trash.svg"
                                )}
                              />
                            </span>
                          </button>
                        ) : (
                          <button
                            title="Delete"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => onActivateClick(countryLists)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Text/Undo.svg"
                                )}
                              />
                            </span>
                          </button>
                        )}
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
                        {/* <CircularProgress /> */}
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
                  totalRecords={countryList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {countryList.recordsTotal} Records
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
              Are you sure want you to deactivate?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button
                type="button"
                className="btn btn-def btn_pdng mr-3"
                onClick={deleteClose}
              >
                Keep
              </button>
              <button
                type="button"
                className="btn btn-delete btn_pdng"
                onClick={onDeactiveClick}
              >
                Yes, Deactivate
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CountryManagementTable;
