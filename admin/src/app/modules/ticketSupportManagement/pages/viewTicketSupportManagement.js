import React from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { Table, Modal } from "react-bootstrap";
import {
  addCommentAsync,
  changeTicketStatusAsync,
} from "../redux/tickets&SupportApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
//import { TicketsAndSupportActions } from "../redux/tickets&SupportAction";

const options = [
  { value: "OPEN", label: "OPEN" },
  { value: "CLOSED", label: "CLOSED" },
];

const perfectScrollbarOptions = {
  wheelSpeed: 1,
  wheelPropagation: false,
};

const ViewTicketSupportManagement = ({
  reply,
  selectedTicket,
  handleReply,
  handleShowReply,
  isLoading,
  createFaqModal,
  DetailsClose,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth, shallowEqual);

  const CommentsSchema = () =>
    Yup.object().shape({
      comments: Yup.string()
        .trim()
        .min(1, "Minimum 1 character")
        .max(1000, "Maximum 1000 characters")
        .required("Comment is required"),
    });

  const formik = useFormik({
    initialValues: {
      comments: "",
    },
    enableReinitialize: true,
    validationSchema: CommentsSchema,
    onSubmit: (values, { resetForm }) => {
      handleReply();
      dispatch(addCommentAsync(selectedTicket._id, values));
      resetForm();
    },
  });

  const onStatusChange = (e) => {
    dispatch(changeTicketStatusAsync(selectedTicket._id, e.value));
  };

  return (
    <>
      <form className="form def_form frmwtpddng">
        <div className="mb-3 fn_s_18 f-w-400 d-flex align-items-center">
          <span className="text-muted pr-3">Status:</span>
          <Select
            className={`form-control border-0 p-0 w-150px`}
            classNamePrefix="phoSelect"
            options={options}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#DCF4E4",
                primary75: "#DCF4E4",
                primary50: "#DCF4E4",
                primary: "#50C878",
              },
            })}
            value={{
              value: selectedTicket.ticketStatus,
              label: selectedTicket.ticketStatus,
            }}
            onChange={(e) => onStatusChange(e)}
          />
        </div>
        <p className="fn_s_18 f-w-400 mb-3">
          <span className="text-muted">Project name:</span>
          {selectedTicket.projectDetails.title}
        </p>
        <p className="fn_s_18 f-w-400 mb-3">
          <span className="text-muted">Subject:</span>
          {selectedTicket.subject}
        </p>
        <p className="fn_s_18 f-w-400 mb-3">
          <span className="text-muted">Reason:</span>
          {selectedTicket.reason}
        </p>
        <p className="fn_s_18 f-w-400 mb-3">
          <span className="text-muted">Description:</span>
          {selectedTicket.details}
        </p>
        <div className="re_replySection">
          <PerfectScrollbar
            className="scroll px-3"
            options={perfectScrollbarOptions}
            style={{ maxHeight: "300px", position: "relative" }}
          >
            <div className="pt-3">
              {selectedTicket.comments.map((item) => (
                <React.Fragment key={item._id}>
                  <div className="pb-1 f16-400 color_red">
                    {user._id === item.senderId
                      ? "Admin"
                      : selectedTicket.userDetails.fullName}
                    :
                  </div>
                  <div className="pb-3 f16-400 re_ellips">{item.msg}</div>
                </React.Fragment>
              ))}
            </div>
          </PerfectScrollbar>
          {selectedTicket.ticketStatus === "OPEN" && (
            <>
              {!reply ? (
                <button
                  className="btn_new btn-sm px-5"
                  type="button"
                  onClick={handleShowReply}
                >
                  Reply
                </button>
              ) : (
                <form className="re_replyForm" onSubmit={formik.handleSubmit}>
                  <div className="w-100 pr-3">
                    <input
                      type="text"
                      placeholder="Write here"
                      className="form-control h-auto"
                      name="comments"
                      {...formik.getFieldProps("comments")}
                    />
                    {formik.touched.comments && formik.errors.comments ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.comments}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <button className="btn_new btn-sm " type="submit">
                    Reply
                  </button>
                </form>
              )}
            </>
          )}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
          <div className="mr-5 mb-1 mt-2">
            <button className="btn-blue" type="button" onClick={DetailsClose}>
              Okay
            </button>
          </div>
          <div className="mr-5 mb-1 mt-2">
            <button
              type="button"
              className="btn btn-outline-blue"
              onClick={DetailsClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewTicketSupportManagement;
