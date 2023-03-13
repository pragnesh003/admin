import axios from "axios";
import { helpCenterAction } from "./helpCenterAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllHelpCenterAsync = (searchBy, searchText, searchDate, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().helpCenter;
      dispatch(helpCenterAction.getAllHelpCenterStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/contactUs/getAll?skip=${skip}&limit=${limit}&column=${searchBy}&type=${type}&dir=&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(helpCenterAction.getAllHelpCenterSuccess(data.data));
      }
      dispatch(helpCenterAction.getAllHelpCenterError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(helpCenterAction.getAllHelpCenterError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
export const updateInquiryAsync = (id, values) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(helpCenterAction.updateInquiryStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/contactUs/updateInquiry/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        return dispatch(helpCenterAction.updateInquirySuccess(data.data));
      }
      dispatch(helpCenterAction.updateInquiryError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(helpCenterAction.updateInquiryError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
