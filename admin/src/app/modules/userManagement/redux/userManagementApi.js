import axios from "axios";
import { UserManagementActions } from "./userManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

// const getCommonBaseURL = (state) => {
//   return state.environnment.environmentLists.commonBaseURL;
// };

export const getAllUserAsync = (searchBy, searchText, dir) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getAllUserStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/getAll?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getAllUserSuccess(data.data));
      }
      dispatch(UserManagementActions.getAllUserError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getAllUserError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const createUserAsync = (userDetail) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.createUserStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/createUser/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: userDetail,
      });

      if (data.code === 200) {
        dispatch(UserManagementActions.createUserSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(UserManagementActions.createUserError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.createUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const updateUserAsync = (user, userID, formData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.updateUserStart());
      // let profileResult;
      // if (formData) {
      //   const { data } = await axios({
      //     method: "POST",
      //     url: `${process.env.REACT_APP_HOST}${commonBaseURL}/uploadImage`,
      //     data: formData,
      //   });
      //   profileResult = data;
      // }
      let finalUserDetails = user;
      // if (formData && profileResult && profileResult.code === 200) {
      //   finalUserDetails = {
      //     ...finalUserDetails,
      //     profilePicture: profileResult.data,
      //   };
      // }
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/update/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.code === 200) {
        dispatch(UserManagementActions.updateUserSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(UserManagementActions.updateUserError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.updateUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const deleteUserAsync = (userID, reason) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.deleteUserStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/delete/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: reason
      });
      if (data.code === 200) {
        dispatch(UserManagementActions.deleteUserSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(UserManagementActions.deleteUserError());
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.deleteUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while deleting user. Please try again later",
          3000
        )
      );
    }
  };
};

export const removeAllActivitiesAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(UserManagementActions.removeAllActivitiesStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/removeAllActivities/${userId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (data.code === 200) {
        dispatch(UserManagementActions.removeAllActivitiesSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      return dispatch(UserManagementActions.removeAllActivitiesError());
    } catch (error) {
      dispatch(UserManagementActions.removeAllActivitiesError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const removeActivityAsync = (userId, activityId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      dispatch(UserManagementActions.removeActivityStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/removeActivity/${userId}/${activityId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (data.code === 200) {
        dispatch(UserManagementActions.removeActivitySuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      return dispatch(UserManagementActions.removeActivityError());
    } catch (error) {
      dispatch(UserManagementActions.removeActivityError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const getAllUserActivitiesAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      //let { _id } = getState().auth.user;
      let { activitySkip, activityLimit } = getState().userManagement;
      dispatch(UserManagementActions.getAllActivityStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllUserActivities/${userId}?skip=${activitySkip}&limit=${activityLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getAllActivitySuccess(data.data));
      }
      dispatch(UserManagementActions.getAllActivityError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getAllActivityError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getUserReportListAsync = (userId, searchBy, searchText, searchDate) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getUserReportListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/report/getUserReportList/${userId}?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getUserReportListSuccess(data.data));
      }
      dispatch(UserManagementActions.getUserReportListError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getUserReportListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateUserStatusAsync = (userId, formData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.updateUserStatusStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/updateUserStatus/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData
      });
      if (data.code === 200) {
        dispatch(UserManagementActions.updateUserStatusSuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(UserManagementActions.updateUserStatusError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.updateUserStatusError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getUserDetailByIdAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.getUserDetailByIdStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/getUserDetailById/${userId}`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (data.code === 200) {
        return await dispatch(UserManagementActions.getUserDetailByIdSuccess(data.data));
      }
      dispatch(UserManagementActions.getUserDetailByIdError());
      return await dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getUserDetailByIdError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getCountryDailCodeAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.getCountryDailCodeStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/getAllCountryDailCode`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (data.code === 200) {
        return await dispatch(UserManagementActions.getCountryDailCodeSuccess(data.data));
      }
      dispatch(UserManagementActions.getCountryDailCodeError());
      return await dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getCountryDailCodeError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getDeletedUserListAsync = (searchBy, searchText) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getDeletedUserListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/getDeletedUserList?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (data.code === 200) {
        return await dispatch(UserManagementActions.getDeletedUserListSuccess(data.data));
      }
      dispatch(UserManagementActions.getDeletedUserListError());
      return await dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getDeletedUserListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getAllReportedUserListAsync = (searchBy, searchText, searchDate) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getReportedUserListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/report/reportedUserList?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getReportedUserListSuccess(data.data));
      }
      dispatch(UserManagementActions.getReportedUserListError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getReportedUserListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getUserDetailsAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.getUserDetailsStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/user/userDetails/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getUserDetailsSuccess(data.data));
      }
      dispatch(UserManagementActions.getUserDetailsError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getUserDetailsError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getUserVideoDetailsAsync = (userId, searchBy, searchText) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getUserVideoListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/video/userVideos/${userId}?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getUserVideoListSuccess(data.data));
      }
      dispatch(UserManagementActions.getUserVideoListError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getUserVideoListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getUserBookmarkListAsync = (userId, searchBy, searchText, searchDate) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getUserBookmarkListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/bookmark/usersBookmarkLocationList/${userId}?skip=${skip}&limit=${limit}&column=${searchBy}&search=${searchText}&searchStartDate=${searchDate.startDate}&searchEndDate=${searchDate.endDate}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(UserManagementActions.getUserBookmarkListSuccess(data.data));
      }
      dispatch(UserManagementActions.getUserBookmarkListError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(UserManagementActions.getUserBookmarkListError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
