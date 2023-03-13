import axios from "axios";
import { BadgeActions } from "./badgeAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const createBadgeAsync = (badgeDetail, setSubmitting, resetForm, redirectBack) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(BadgeActions.createBadgeStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/badge/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: badgeDetail,
      });
      if (data.code === 200) {
        dispatch(BadgeActions.createBadgeSuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(BadgeActions.createBadgeError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(BadgeActions.createBadgeError());
      setSubmitting(false);
      resetForm();
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};

export const getAllBadgeAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(BadgeActions.getAllBadge());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/badge/getAll`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(BadgeActions.getAllBadgeSuccess(data.data));
      }
      dispatch(BadgeActions.getAllBadgeError());
      dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(BadgeActions.getAllBadgeError());
      dispatch(
        showSuccessSnackbar("error", "Error while fetching Data.", 3000)
      );
    }
  };
};

export const updateBadgeAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { selectedBadge } = getState().badge;
      dispatch(BadgeActions.updateBadgeStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/badge/updateDetails/${selectedBadge._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(BadgeActions.updateBadgeSuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(BadgeActions.updateBadgeError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(BadgeActions.updateBadgeError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteBadgeAsync = (badgeID) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(BadgeActions.deleteBadgeStart());
      let { data } = await axios({
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/badge/delete/${badgeID}`,
        method: "DELETE",
      });
      if (data.code === 200) {
        dispatch(BadgeActions.deleteBadgeSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(BadgeActions.deleteBadgeError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(BadgeActions.deleteBadgeError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating.Please try again after sometime..",
          3000
        )
      );
    }
  };
};

export const getAllFilterBadgeAsync = (searchBy, searchText, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { skip, limit } = getState().badge;
      dispatch(BadgeActions.getAllFilterBadge());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/badge/getAllFilterBadge?skip=${skip}&limit=${limit}&column=${searchBy}&dir=&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(BadgeActions.getAllFilterBadgeSuccess(data.data));
      }
      dispatch(BadgeActions.getAllFilterBadgeError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(BadgeActions.getAllFilterBadgeError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};