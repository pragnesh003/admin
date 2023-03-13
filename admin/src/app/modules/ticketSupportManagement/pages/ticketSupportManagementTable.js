import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table, Modal } from "react-bootstrap";
import BasicPagination from "../../pagination/BasicPagination";
import SVG from "react-inlinesvg";
import queryString from "query-string";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { TicketsAndSupportActions } from "../redux/tickets&SupportAction";
import { getAllTicketsAsync } from "../redux/tickets&SupportApi";
import { CircularProgress } from "@material-ui/core";
import ViewTicketSupportManagement from "./viewTicketSupportManagement";
import EditTicketSupportManagement from "./editTicketSupportManagement";

const TicketSupportManagementTable = () => {
  const { refId } = queryString.parse(window.location.search);
  const [getInstance] = useState();
  const {
    refreshAllTickets,
    getAllTicketsList,
    skip,
    limit,
    isLoading,
    selectedTicket,
  } = useSelector((state) => state.ticketsAndSupport, shallowEqual);

  const dispatch = useDispatch();

  const setSelectedTicket = (ticket) => {
    dispatch(TicketsAndSupportActions.setSelectedTicket(ticket));
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(TicketsAndSupportActions.setTicketBatchNumber(count));
  };

  const [DetailsModal, setDetailsModal] = useState(false);
  const [PaymentModal, setPaymentModal] = useState(false);
  const DetailsClose = () => setDetailsModal(false);
  const PaymentClose = () => setPaymentModal(false);
  //eslint-disable-next-line
  const DetailsShow = (item) => {
    setSelectedTicket(item);
    setDetailsModal(true);
  };

  const [UpdateDetailsModal, setUpdateDetailsModal] = useState(false);
  const UpdateDetailsClose = () => setUpdateDetailsModal(false);
  const UpdateDetailsShow = (item) => {
    setSelectedTicket(item);
    setUpdateDetailsModal(true);
  };

  const [reply, setReply] = useState(false);
  const handleShowReply = () => setReply(true);
  const handleReply = () => setReply(false);

  useEffect(() => {
    if (refreshAllTickets) {
      dispatch(getAllTicketsAsync());
    }
  }, [dispatch, refreshAllTickets]);

  const handleApprovePayment = async () => {
    if (getInstance) {
      try {
        // const approvePaymentObj = {
        //   projectId: selectedTicket.scProjectId,
        //   packageId: selectedTicket.scPackageId,
        //   collaborator: selectedTicket.colDetails.walletAddress,
        // };

        setPaymentModal(false);
      } catch (error) {}
    }
  };

  const handleDeclinePayment = async () => {
    if (getInstance) {
      try {
        setPaymentModal(false);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (refId) {
      const notificationData =
        getAllTicketsList.data &&
        getAllTicketsList.data.find((x) => x._id === refId);
      notificationData && DetailsShow(notificationData);
    }
  }, [refId, getAllTicketsList, DetailsShow]);

  const paymentShow = (item) => {
    setSelectedTicket(item);
    setPaymentModal(true);
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
                  <th>Ticket ID</th>
                  <th>User Name</th>
                  <th>Subject</th>
                  <th>Raised Date</th>
                  <th>Status</th>
                  <th width="150px">Action</th>
                </tr>
              </thead>
              <tbody>
                {getAllTicketsList.data && getAllTicketsList.data.length ? (
                  getAllTicketsList.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span className="f-w-500">
                            {skip * limit + (index + 1)}
                          </span>
                        </td>
                        <td>
                          <span className="f-w-500">
                            {item.userDetails && item.userDetails.fullName
                              ? item.userDetails.fullName
                              : ""}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="subjectDisplay">
                              {item.subject}
                            </span>
                            {item.subject && item.subject.length >= 60 && (
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip className="re_tooltip">
                                    {item.subject}
                                  </Tooltip>
                                }
                              >
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/svg/icons/Communication/infoblack.svg"
                                  )}
                                  alt="info"
                                  className="ml-2 w-15px"
                                />
                              </OverlayTrigger>
                            )}
                          </div>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`label label-lg label-light-success label-inline`}
                          >
                            {item.ticketStatus}
                          </span>
                        </td>
                        <td>
                          <button
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                            onClick={() => UpdateDetailsShow(item)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              />
                            </span>
                          </button>
                          <button
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-success btn-sm mx-3"
                            onClick={() => DetailsShow(item)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-success">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/custom/eye.svg"
                                )}
                              />
                            </span>
                          </button>
                          {item.ticketStatus === "OPEN" &&
                            (item.packageDetails.packages[0].workStatus ===
                              "SUBMITTED" ||
                              item.packageDetails.packages[0].workStatus ===
                                "COMPLETED") && (
                              <button
                                title="Payment"
                                className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
                                onClick={() => paymentShow(item)}
                              >
                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                  <SVG
                                    src={toAbsoluteUrl(
                                      "/media/svg/icons/Code/Done-circle.svg"
                                    )}
                                  />
                                </span>
                              </button>
                            )}
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
                    <td colSpan={8} className="text-center p-0 border-0">
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
                  totalRecords={getAllTicketsList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {getAllTicketsList.recordsTotal} Records
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={DetailsModal}
        onHide={DetailsClose}
        centered
        size="lg"
        className="def_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fn_s_18 color_blk f-w-700">
            Support Ticket Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewTicketSupportManagement
            selectedTicket={selectedTicket}
            isLoading={isLoading}
            handleReply={handleReply}
            handleShowReply={handleShowReply}
            DetailsClose={DetailsClose}
            reply={reply}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={UpdateDetailsModal}
        onHide={UpdateDetailsClose}
        centered
        size="lg"
        className="def_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fn_s_18 color_blk f-w-700">
            Support Ticket Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTicketSupportManagement
            selectedTicket={selectedTicket}
            isLoading={isLoading}
            handleReply={handleReply}
            UpdateDetailsClose={UpdateDetailsClose}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={PaymentModal}
        onHide={PaymentClose}
        centered
        size="lg"
        className="def_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fn_s_18 color_blk f-w-700">
            Approve/Decline Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
            <div className="form-group mr-5 mb-1 mt-2">
              <button
                type="button"
                className="btn-blue"
                onClick={handleApprovePayment}
              >
                Approve
              </button>
            </div>
            <div className="form-group mr-5 mb-1 mt-2">
              <button
                className="btn-blue"
                type="button"
                onClick={handleDeclinePayment}
              >
                Decline
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TicketSupportManagementTable;
