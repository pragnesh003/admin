import { VideoManagementMap } from "./videoManagementAction";

const initialState = {
  isLoading: false,
  videoList: {},
  refreshVideoList: true,
  selectedVideo: null,
  searchBy: "",
  searchText: "",
  skip: 0,
  limit: 10,
  reportedVideoList: [],
  searchDate: {},
  dir: "dsc"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VideoManagementMap.GET_ALL_VIDEO_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case VideoManagementMap.GET_ALL_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        videoList: action.payload,
        refreshVideoList: false,
      };
    }
    case VideoManagementMap.GET_ALL_VIDEO_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
      };
    }
    case VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_START: {
      return {
        ...state,
        isLoading: true,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
        reportedVideoList: action.payload,
      };
    }
    case VideoManagementMap.GET_ALL_VIDEO_REPORT_USER_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
      };
    }
    case VideoManagementMap.GET_REPORTED_VIDEO_START: {
      return {
        ...state,
        isLoading: true,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.GET_REPORTED_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
        reportedVideoList: action.payload,
      };
    }
    case VideoManagementMap.GET_REPORTED_VIDEO_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
      };
    }

    case VideoManagementMap.SELECT_VIDEO_DETAILS: {
      return {
        ...state,
        isLoading: false,
        selectedVideo: action.payload,
      };
    }
    case VideoManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case VideoManagementMap.REFRESH_VIDEO_LIST: {
      return {
        ...state,
        skip: 0,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.SET_VIDEO_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshVideoList: true
      };
    }
    case VideoManagementMap.DELETE_VIDEO_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case VideoManagementMap.DELETE_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.DELETE_VIDEO_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshVideoList: false,
      };
    }
    case VideoManagementMap.RESET_PAGINATION: {
      return {
        ...state,
        skip: 0,
        limit: 10,
      };
    }
    case VideoManagementMap.SEARCH_DATE_CHANGE: {
      return {
        ...state,
        searchDate: action.payload,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.SEARCH_BY_CHANGE: {
      return {
        ...state,
        searchBy: action.payload,
        refreshVideoList: true,
      };
    }
    case VideoManagementMap.SORTING_CHANGE: {
      return {
        ...state,
        dir: action.payload,
        refreshVideoList: true,
      };
    }
    default:
      return { ...state };
  }
};
