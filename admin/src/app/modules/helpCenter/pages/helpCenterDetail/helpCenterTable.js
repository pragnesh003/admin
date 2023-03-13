import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
import { helpCenterAction, updateInquiryAsync } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { CircularProgress, FormControlLabel, Switch } from "@material-ui/core";

const HelpCenterTable = () => {
  const { isLoading, HelpCenterList, skip, limit } = useSelector(
    (state) => state.helpCenter,
    shallowEqual
  );

  const dispatch = useDispatch();
  const [resolvedModal, setResolvedModal] = useState(false);
  const resolvedClose = () => setResolvedModal(false);
  const resolvedShow = () => setResolvedModal(true);
  const [selectedInquiryName, setselectedInquiryName] = useState({});
  const [isResolved, setIsResolved] = useState();

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(helpCenterAction.setHelpCenterBatchNumber(count));
  };

  // onResolved Function
  const onResolvedClick = (event, inquiryDetail) => {
    setIsResolved(event.target.checked)
    setselectedInquiryName(inquiryDetail);
    resolvedShow();
  };

  const onDeactiveClick = () => {
    dispatch(updateInquiryAsync(selectedInquiryName._id, { isResolved: isResolved }));
    setselectedInquiryName({});
    resolvedClose();
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {HelpCenterList.records && HelpCenterList.records.length ? (
                  HelpCenterList.records.map((HelpCenterLists, index) => (
                    <tr key={index}>
                      <td>
                        <span className="f-w-500">
                          {skip * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span>
                          <span className="f-w-500" >{HelpCenterLists.name}</span>
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{HelpCenterLists.email}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{HelpCenterLists.message}</span>
                      </td>
                      <td>
                        <span className="f-w-500">{new Date(HelpCenterLists.createdOn).toLocaleDateString()}</span>
                      </td>
                      <td>
                        <div>
                          <FormControlLabel
                            control={
                              HelpCenterLists.isResolved ?
                                <Switch checked={HelpCenterLists.isResolved} color="primary" name="inquiry" style={{ cursor: "default" }} disableRipple /> :
                                <Switch checked={HelpCenterLists.isResolved} onChange={(e) => onResolvedClick(e, HelpCenterLists)} color="primary" name="inquiry" />
                            }
                          />
                        </div>
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
                  totalRecords={HelpCenterList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {HelpCenterList.recordsTotal} Records
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={resolvedModal} onHide={resolvedClose} centered className="def_modal delete_modal" >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Conformation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure it was resolved?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button type="button" className="btn btn-def btn_pdng mr-3" onClick={resolvedClose} >
                Keep
              </button>
              <button type="button" className="btn btn-delete btn_pdng" onClick={onDeactiveClick} >
                Yes, Resolved
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div >
  );
};

export default HelpCenterTable;
