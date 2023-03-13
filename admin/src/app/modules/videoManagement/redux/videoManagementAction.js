export const VideoManagementMap = {
  GET_ALL_VIDEO_START: "GET_ALL_VIDEO_START",
  GET_ALL_VIDEO_SUCCESS: "GET_ALL_VIDEO_SUCCESS",
  GET_ALL_VIDEO_ERROR: "GET_ALL_VIDEO_ERROR",
  GET_ALL_VIDEO_REPORT_USER_LIST_START: "GET_ALL_VIDEO_REPORT_USER_LIST_START",
  GET_ALL_VIDEO_REPORT_USER_LIST_SUCCESS: "GET_ALL_VIDEO_REPORT_USER_LIST_SUCCESS",
  GET_ALL_VIDEO_REPORT_USER_LIST_ERROR: "GET_ALL_VIDEO_REPORT_USER_LIST_ERROR",
  SELECT_VIDEO_DETAILS: "SELECT_VIDEO_DETAILS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_VIDEO_LIST: "REFRESH_VIDEO_LIST",
  GET_REPORTED_VIDEO_START: "GET_REPORTED_VIDEO_START",
  GET_REPORTED_VIDEO_SUCCESS: "GET_REPORTED_VIDEO_SUCCESS",
  GET_REPORTED_VIDEO_ERROR: "GET_REPORTED_VIDEO_ERROR",
  SET_VIDEO_BATCH_NUMBER: "SET_VIDEO_BATCH_NUMBER",
  DELETE_VIDEO_START: "DELETE_VIDEO_START",
  DELETE_VIDEO_SUCCESS: "DELETE_VIDEO_SUCCESS",
  DELETE_VIDEO_ERROR: "DELETE_VIDEO_ERROR",
  RESET_PAGINATION: "RESET_PAGINATION",
  SEARCH_DATE_CHANGE: "SEARCH_DATE_CHANGE",
  SEARCH_BY_CHANGE: "SEARCH_BY_CHANGE",
  SORTING_CHANGE: "SORTING_CHANGE",
};

export const VideoManagementActions = {
  getAllVideoStart: (data) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_START,
    payload: data,
  }),
  getAllVideoSuccess: (data) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_SUCCESS,
    payload: data,
  }),
  getAllVideoError: (errors) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_ERROR,
    payload: { errors },
  }),
  getAllVideoReportUserListStart: (data) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_START,
    payload: data,
  }),
  getAllVideoReportUserListSuccess: (data) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_SUCCESS,
    payload: data,
  }),
  getAllVideoReportUserListError: (errors) => ({
    type: VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_ERROR,
    payload: { errors },
  }),
  getReportedVideoStart: (data) => ({
    type: VideoManagementMap.GET_REPORTED_VIDEO_START,
    payload: data,
  }),
  getReportedVideoSuccess: (data) => ({
    type: VideoManagementMap.GET_REPORTED_VIDEO_SUCCESS,
    payload: data,
  }),
  getReportedVideoError: (errors) => ({
    type: VideoManagementMap.GET_REPORTED_VIDEO_ERROR,
    payload: { errors },
  }),

  setSelectedVideo: (data) => ({
    type: VideoManagementMap.SELECT_VIDEO_DETAILS,
    payload: data,
  }),
  applyFilters: (data) => ({
    type: VideoManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  searchTextChange: (data) => ({
    type: VideoManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  refreshVideoList: () => ({ type: VideoManagementMap.REFRESH_VIDEO_LIST }),
  setVideoBatchNumber: (data) => ({
    type: VideoManagementMap.SET_VIDEO_BATCH_NUMBER,
    payload: data,
  }),
  deleteVideoStart: (data) => ({
    type: VideoManagementMap.DELETE_VIDEO_START,
    payload: data,
  }),
  deleteVideoSuccess: (data) => ({
    type: VideoManagementMap.DELETE_VIDEO_SUCCESS,
    payload: data,
  }),
  deleteVideoError: (data) => ({
    type: VideoManagementMap.DELETE_VIDEO_ERROR,
    payload: data,
  }),
  resetPagination: (data) => ({
    type: VideoManagementMap.RESET_PAGINATION,
    payload: data,
  }),
  searchDateChange: (data) => ({
    type: VideoManagementMap.SEARCH_DATE_CHANGE,
    payload: data,
  }),
  searchByChange: (data) => ({
    type: VideoManagementMap.SEARCH_BY_CHANGE,
    payload: data,
  }),
  sortingChange: (data) => ({
    type: VideoManagementMap.SORTING_CHANGE,
    payload: data,
  }),
};
