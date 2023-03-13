import { BadgeMap } from './badgeAction';

const initialState = {
    isLoading: false,
    badgeList: {},
    refreshBadge: true,
    selectedBadge: {},
    reDirect: false,
    searchBy: "",
    searchText: "",
    skip: 0,
    limit: 10,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BadgeMap.CREATE_BADGE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case BadgeMap.CREATE_BADGE_SUCCESS: {
            return {
                ...state,
                refreshBadge: true,
                reDirect: true
            }
        }
        case BadgeMap.CREATE_BADGE_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case BadgeMap.GET_ALL_BADGE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case BadgeMap.GET_ALL_BADGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshBadge: false,
                badgeList: action.payload
            }
        }
        case BadgeMap.GET_ALL_BADGE_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshBadge: false
            }
        }
        case BadgeMap.UPDATE_BADGE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case BadgeMap.UPDATE_BADGE_SUCCESS: {

            return {
                ...state,
                refreshBadge: true,
                selectedBadge: {
                    ...state.selectedBadge,
                    ...action.payload
                },
                reDirect: true
            }
        }
        case BadgeMap.UPDATE_BADGE_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case BadgeMap.DELETE_BADGE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case BadgeMap.DELETE_BADGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshBadge: true
            }
        }
        case BadgeMap.DELETE_BADGE_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case BadgeMap.SET_SELECTED_BADGE: {
            return {
                ...state,
                selectedBadge: action.payload,
                reDirect: false
            }
        }
        case BadgeMap.SEARCH_TEXT_CHANGE: {
            return {
                ...state,
                searchText: action.payload,
            };
        }
        case BadgeMap.REFRESH_BADGE_LIST: {
            return {
                ...state,
                skip: 0,
                refreshBadge: true,
            };
        }
        case BadgeMap.GET_ALL_FILTER_BADGE_START: {
            return {
              ...state,
              isLoading: true,
            };
          }
          case BadgeMap.GET_ALL_FILTER_BADGE_SUCCESS: {
            return {
              ...state,
              isLoading: false,
              badgeList: action.payload,
              refreshBadge: false,
            };
          }
          case BadgeMap.GET_ALL_FILTER_BADGE_ERROR: {
            return {
              ...state,
              isLoading: false,
              refreshBadge: false,
            };
          }
        default: return { ...state }
    }
}