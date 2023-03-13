import axios from "axios";
import { VideoManagementActions } from "./videoManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllVideoAsync = (searchBy, searchText, searchDate, dir) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().videoManagement;
      dispatch(VideoManagementActions.getAllVideoStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/video/getAllVideos?skip=${skip}&limit=${limit}&column=${searchBy}&dir=${dir}&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(VideoManagementActions.getAllVideoSuccess(data.data));
      }
      dispatch(VideoManagementActions.getAllVideoError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(VideoManagementActions.getAllVideoError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getAllVideoReportUserListAsync = (videoId, searchBy, searchText, searchDate) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().videoManagement;
      dispatch(VideoManagementActions.getAllVideoReportUserListStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/video/getReportedVideoUserList?videoId=${videoId}&skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(VideoManagementActions.getAllVideoReportUserListSuccess(data.data));
      }
      dispatch(VideoManagementActions.getAllVideoReportUserListError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(VideoManagementActions.getAllVideoReportUserListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getReportedVideoAsync = (searchBy, searchText, searchDate) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().videoManagement;
      dispatch(VideoManagementActions.getReportedVideoStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/video/allReportedVideo?skip=${skip}&limit=${limit}&column=${searchBy}&dir=&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(VideoManagementActions.getReportedVideoSuccess(data.data));
      }
      dispatch(VideoManagementActions.getReportedVideoError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(VideoManagementActions.getReportedVideoError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteVideoAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(VideoManagementActions.deleteVideoStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/video/delete/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(VideoManagementActions.deleteVideoSuccess(data.data));
      }
      dispatch(VideoManagementActions.deleteVideoError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(VideoManagementActions.deleteVideoError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};