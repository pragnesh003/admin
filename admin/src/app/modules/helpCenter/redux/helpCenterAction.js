export const HelpCenterMap = {
  GET_ALL_HELP_CENTER_START: "GET_ALL_HELP_CENTER_START",
  GET_ALL_HELP_CENTER_SUCCESS: "GET_ALL_HELP_CENTER_SUCCESS",
  GET_ALL_HELP_CENTER_ERROR: "GET_ALL_HELP_CENTER_ERROR",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  SET_HELP_CENTER_BATCH_NUMBER: "SET_HELP_CENTER_BATCH_NUMBER",
  SEARCH_DATE_CHANGE: "SEARCH_DATE_CHANGE",
  UPDATE_INQUIRY_START: "UPDATE_INQUIRY_START",
  UPDATE_INQUIRY_SUCCESS: "UPDATE_INQUIRY_SUCCESS",
  UPDATE_INQUIRY_ERROR: "UPDATE_INQUIRY_ERROR",
};

export const helpCenterAction = {
  getAllHelpCenterStart: (data) => ({
    type: HelpCenterMap.GET_ALL_HELP_CENTER_START,
    payload: data,
  }),
  getAllHelpCenterSuccess: (data) => ({
    type: HelpCenterMap.GET_ALL_HELP_CENTER_SUCCESS,
    payload: data,
  }),
  getAllHelpCenterError: (errors) => ({
    type: HelpCenterMap.GET_ALL_HELP_CENTER_ERROR,
    payload: { errors },
  }),
  refreshHelpCenterList: () => ({ type: HelpCenterMap.REFRESH_HELP_CENTER_LIST }),
  searchTextChange: (data) => ({
    type: HelpCenterMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  searchDateChange: (data) => ({
    type: HelpCenterMap.SEARCH_DATE_CHANGE,
    payload: data,
  }),
  setHelpCenterBatchNumber: (data) => ({
    type: HelpCenterMap.SET_HELP_CENTER_BATCH_NUMBER,
    payload: data,
  }),
  updateInquiryStart: (data) => ({
    type: HelpCenterMap.UPDATE_INQUIRY_START,
    payload: data,
  }),
  updateInquirySuccess: (data) => ({
    type: HelpCenterMap.UPDATE_INQUIRY_SUCCESS,
    payload: data,
  }),
  updateInquiryError: (errors) => ({
    type: HelpCenterMap.UPDATE_INQUIRY_ERROR,
    payload: { errors },
  }),
};
