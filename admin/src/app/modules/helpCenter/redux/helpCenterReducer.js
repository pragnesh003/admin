import { HelpCenterMap } from "./helpCenterAction";

const initialState = {
  isLoading: false,
  HelpCenterList: {},
  refreshHelpCenterList: true,
  searchBy: "",
  countries: [],
  searchText: "",
  searchDate: {},
  skip: 0,
  limit: 10,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HelpCenterMap.GET_ALL_HELP_CENTER_START: {
      return {
        ...state,
        isLoading: true,

      };
    }
    case HelpCenterMap.GET_ALL_HELP_CENTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        HelpCenterList: action.payload,
        refreshHelpCenterList: false,
      };
    }
    case HelpCenterMap.GET_ALL_HELP_CENTER_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshHelpCenterList: false,
      };
    }

    case HelpCenterMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
        refreshHelpCenterList: true
      };
    }
    case HelpCenterMap.SET_HELP_CENTER_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshHelpCenterList: true,
      };
    }
    case HelpCenterMap.SEARCH_DATE_CHANGE: {
      return {
        ...state,
        searchDate: action.payload,
        refreshHelpCenterList: true
      };
    }
    case HelpCenterMap.UPDATE_INQUIRY_START: {
      return {
        ...state,
        isLoading: true,
        refreshHelpCenterList: true,
      };
    }
    case HelpCenterMap.UPDATE_INQUIRY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshHelpCenterList: false,
      };
    }
    case HelpCenterMap.UPDATE_INQUIRY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshHelpCenterList: false,
      };
    }
    default:
      return { ...state };
  }
};
