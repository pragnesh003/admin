import { UserManagementMap } from "./userManagementAction";

const initialState = {
  isLoading: false,
  userList: {},
  activityList: {},
  refreshUserList: true,
  refreshActivities: true,
  selectedUser: {},
  country: "",
  minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  maxDate: new Date(),
  searchBy: "",
  searchText: "",
  activitySkip: 0,
  activityLimit: 10,
  skip: 0,
  limit: 10,
  dir: "",
  reDirect: false,
  defaultPassword: "",
  reportList: [],
  userDetail: {},
  dailCode: [],
  deletedUserList: [],
  refreshDeletedUserList: true,
  refreshAllReportedUserList: true,
  userVideoList: [],
  refreshUserVideoList: true,
  searchDate: {},
  refreshUserBookmarkList: true,
  userBookmark: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserManagementMap.GET_ALL_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_ALL_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userList: action.payload,
        refreshUserList: false,
        refreshActivities: true,
      };
    }
    case UserManagementMap.GET_ALL_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshUserList: false,
      };
    }
    case UserManagementMap.CREATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.CREATE_USER_SUCCESS: {
      return {
        ...state,
        refreshUserList: true,
        reDirect: true,
      };
    }
    case UserManagementMap.CREATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.UPDATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshUserList: true,
        refreshActivities: true,
        selectedUser: {
          ...state.selectedUser,
          ...action.payload,
        },
        reDirect: true,
      };
    }
    case UserManagementMap.UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.DELETE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.DELETE_USER_SUCCESS: {
      return {
        ...state,
        refreshUserList: true,
        selectedUser: null,
      };
    }
    case UserManagementMap.DELETE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.REMOVE_ALL_ACTIVITIES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserManagementMap.REMOVE_ALL_ACTIVITIES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.SELECT_USER_DETAILS: {
      return {
        ...state,
        selectedUser: action.payload,
        refreshActivities: true,
        reDirect: false,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: true,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.REMOVE_ALL_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: true,
        selectedUser: {
          ...state.selectedUser,
          ...action.payload,
        },
      };
    }
    case UserManagementMap.APPLY_FILTERS:
    case UserManagementMap.COUNTRY_FILTERS: {
      return {
        ...state,
        ...action.payload,
        refreshUserList: true,
        refreshActivities: true,
        searchText: "",
        skip: initialState.skip,
        limit: initialState.limit,
      };
    }
    case UserManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case UserManagementMap.REFRESH_USER_LIST: {
      return {
        ...state,
        skip: 0,
        refreshUserList: true,
      };
    }
    case UserManagementMap.SET_USER_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshUserList: true,
        refreshDeletedUserList: true,
        refreshUserVideoList: true,
        refreshUserBookmarkList: true,
      };
    }

    case UserManagementMap.SET_ACTIVITIES_BATCH_NUMBER: {
      return {
        ...state,
        activitySkip: action.payload,
        refreshActivities: true,
      };
    }

    case UserManagementMap.GET_ALL_ACTIVITY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_ALL_ACTIVITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        activityList: action.payload,
        refreshActivities: false,
      };
    }
    case UserManagementMap.GET_ALL_ACTIVITY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: false,
      };
    }
    case UserManagementMap.SET_SORT_CHANGE: {
      return {
        ...state,
        searchBy: action.payload?.column,
        dir: action.payload?.dir,
        refreshUserList: true,
        refreshActivities: true,
      };
    }
    case UserManagementMap.GET_USER_REPORT_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_USER_REPORT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        reportList: action.payload,
      };
    }
    case UserManagementMap.GET_USER_REPORT_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.UPDATE_USER_STATUS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.UPDATE_USER_STATUS_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        refreshUserList: true,
        userList: action.payload,
      };
    }
    case UserManagementMap.UPDATE_USER_STATUS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.GET_USER_DETAIL_BY_ID_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_USER_DETAIL_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };
    }
    case UserManagementMap.GET_USER_DETAIL_BY_ID_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.GET_COUNTRY_DAILCODE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_COUNTRY_DAILCODE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dailCode: action.payload,
      };
    }
    case UserManagementMap.GET_COUNTRY_DAILCODE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.GET_DELETED_USER_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_DELETED_USER_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshDeletedUserList: false,
        deletedUserList: action.payload,
      };
    }
    case UserManagementMap.GET_DELETED_USER_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshDeletedUserList: false,
      };
    }
    case UserManagementMap.SEARCH_DELETED_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case UserManagementMap.GET_REPORTED_USER_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_REPORTED_USER_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshAllReportedUserList: false,
        refreshUserList: false,
        limit: 10,
        reportList: action.payload,
      };
    }
    case UserManagementMap.GET_REPORTED_USER_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshAllReportedUserList: false,
        refreshUserList: false,
      };
    }
    case UserManagementMap.GET_USER_DETAILS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };
    }
    case UserManagementMap.GET_USER_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.GET_USER_VIDEO_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_USER_VIDEO_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshUserVideoList: false,
        userVideoList: action.payload,
      };
    }
    case UserManagementMap.GET_USER_VIDEO_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshUserVideoList: false,
      };
    }
    case UserManagementMap.SET_USER_PAGE_LIMIT: {
      return {
        ...state,
        limit: action.payload,
      };
    }
    case UserManagementMap.SEARCH_DATE_CHANGE: {
      return {
        ...state,
        searchDate: action.payload,
        refreshAllReportedUserList: true,
        refreshUserList: true,
        refreshUserBookmarkList: true,
      };
    }
    case UserManagementMap.GET_USER_BOOKMARK_LIST_START: {
      return {
        ...state,
        isLoading: true,
        refreshUserBookmarkList: true,
      };
    }
    case UserManagementMap.GET_USER_BOOKMARK_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshUserBookmarkList: false,
        userBookmark: action.payload,
      };
    }
    case UserManagementMap.GET_USER_BOOKMARK_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshUserBookmarkList: false,
      };
    }
    case UserManagementMap.REFRESH_USER_BOOKMARK_LIST: {
      return {
        ...state,
        skip: 0,
        refreshUserBookmarkList: true,
      };
    }
    default:
      return { ...state };
  }
};
