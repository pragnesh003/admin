import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateTicketDetailsAsync } from "../redux/tickets&SupportApi";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const EditTicketSupportManagement = ({
  handleReply,
  selectedTicket,
  isLoading,
  UpdateDetailsClose,
}) => {
  const dispatch = useDispatch();

  const UpdateTicketsSchema = () =>
    Yup.object().shape({
      subject: Yup.string()
        .trim()
        .required("Subject is required"),
      details: Yup.string()
        .trim()
        .required("Details is required"),
      reason: Yup.string()
        .trim()
        .required("Reason is required"),
    });

  const formik = useFormik({
    initialValues: {
      subject: selectedTicket.subject || "",
      details: selectedTicket.details || "",
      reason: selectedTicket.reason || "",
    },
    enableReinitialize: true,
    validationSchema: UpdateTicketsSchema,
    onSubmit: (values, { resetForm }) => {
      handleReply();
      dispatch(updateTicketDetailsAsync(selectedTicket._id, values));
      UpdateDetailsClose();
      resetForm();
    },
  });

  return (
    <>
      <form className="form def_form frmwtpddng" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                placeholder="subject"
                type="text"
                className={`form-control`}
                name="subject"
                {...formik.getFieldProps("subject")}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.subject}</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-label">Details</label>
              <textarea
                placeholder="details"
                type="text"
                className={`form-control`}
                name="details"
                {...formik.getFieldProps("details")}
              />
              {formik.touched.details && formik.errors.details ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.details}</div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-label">Reason</label>
              <textarea
                placeholder="Reason"
                type="text"
                className={`form-control`}
                name="reason"
                {...formik.getFieldProps("reason")}
              />
              {formik.touched.reason && formik.errors.reason ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.reason}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
          <div className="form-group mr-5 mb-1 mt-2">
            <button
              type="submit"
              className="btn btn-blue spinnerBtn"
              disabled={isLoading}
            >
              Update
              {isLoading && (
                <div className="ml-3 basic-verification-loader text-center">
                  <CircularProgress />
                </div>
              )}
            </button>
          </div>
          <div className="mr-5 mb-1 mt-2">
            <button
              type="button"
              className="btn btn-outline-blue"
              onClick={UpdateDetailsClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTicketSupportManagement;
