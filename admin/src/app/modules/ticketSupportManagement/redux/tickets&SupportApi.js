import axios from "axios";
import { TicketsAndSupportActions } from "./tickets&SupportAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllTicketsAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().ticketsAndSupport;
      dispatch(TicketsAndSupportActions.getAllTicketsStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/ticketManagement/getAllSupportTicket/${_id}?skip=${skip}&limit=${limit}`,
        method: "GET",
      });
      if (data.code === 200) {
        return dispatch(
          TicketsAndSupportActions.getAllTicketsSuccess(data.data)
        );
      }
      dispatch(TicketsAndSupportActions.getAllTicketsError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(TicketsAndSupportActions.getAllTicketsError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while fetching Data.Please try again after some time",
          3000
        )
      );
    }
  };
};

export const addCommentAsync = (selectedTicketID, comment) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(TicketsAndSupportActions.addCommentStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/ticketManagement/addComment/${_id}/${selectedTicketID}`,
        method: "POST",
        data: comment,
      });
      if (data.code === 200) {
        dispatch(TicketsAndSupportActions.addCommentSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(TicketsAndSupportActions.addCommentError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(TicketsAndSupportActions.addCommentError());
      return dispatch(
        showSuccessSnackbar("error", "Please try again later.", 3000)
      );
    }
  };
};

export const changeTicketStatusAsync = (ticketId, ticketStatus) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(TicketsAndSupportActions.changeTicketStatusStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/ticketManagement/changeTicketStatus/${_id}/${ticketId}/${ticketStatus}`,
        method: "GET",
      });
      if (data.code === 200) {
        dispatch(TicketsAndSupportActions.changeTicketStatusSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(TicketsAndSupportActions.changeTicketStatusError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(TicketsAndSupportActions.changeTicketStatusError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating ticket status. Please try again later.",
          3000
        )
      );
    }
  };
};

export const updateTicketDetailsAsync = (ticketId, details) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(TicketsAndSupportActions.updateTicketsDetailsStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/ticketManagement/updateTicketDetails/${_id}/${ticketId}`,
        method: "PUT",
        data: details,
      });
      if (data.code === 200) {
        dispatch(
          TicketsAndSupportActions.updateTicketsDetailsSuccess(data.data)
        );
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(TicketsAndSupportActions.updateTicketsDetailsError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(TicketsAndSupportActions.updateTicketsDetailsError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating ticket details. Please try again later.",
          3000
        )
      );
    }
  };
};

export const updateRemainingBudgetAsync = (details) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      const projectId = details.projectId;
      const budget = details.budget;
      let { _id } = getState().auth.user;

      await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateRemainingBudget/${_id}/${projectId}/${budget}`,
        method: "GET",
      });

      return true;
    } catch (error) {
      return false;
    }
  };
};
