export const BadgeMap = {
    CREATE_BADGE_START: 'CREATE_BADGE_START',
    CREATE_BADGE_SUCCESS: 'CREATE_BADGE_SUCCESS',
    CREATE_BADGE_ERROR: 'CREATE_BADGE_ERROR',
    GET_ALL_BADGE_START: 'GET_ALL_BADGE_START',
    GET_ALL_BADGE_SUCCESS: 'GET_ALL_BADGE_SUCCESS',
    GET_ALL_BADGE_ERROR: 'GET_ALL_BADGE_ERROR',
    UPDATE_BADGE_START: 'UPDATE_BADGE_START',
    UPDATE_BADGE_SUCCESS: 'UPDATE_BADGE_SUCCESS',
    UPDATE_BADGE_ERROR: 'UPDATE_BADGE_ERROR',
    DELETE_BADGE_START: 'DELETE_BADGE_START',
    DELETE_BADGE_SUCCESS: 'DELETE_BADGE_SUCCESS',
    DELETE_BADGE_ERROR: 'DELETE_BADGE_ERROR',
    SET_SELECTED_BADGE: 'SET_SELECTED_BADGE',
    GET_ALL_FILTER_BADGE_START: 'GET_ALL_FILTER_BADGE_START',
    GET_ALL_FILTER_BADGE_SUCCESS: 'GET_ALL_FILTER_BADGE_SUCCESS',
    GET_ALL_FILTER_BADGE_ERROR: 'GET_ALL_FILTER_BADGE_ERROR',
    SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
    REFRESH_BADGE_LIST: "REFRESH_BADGE_LIST",
}

export const BadgeActions = {
    getAllBadge: (data) => ({ type: BadgeMap.GET_ALL_BADGE_START, payload: data }),
    getAllBadgeSuccess: (data) => ({ type: BadgeMap.GET_ALL_BADGE_SUCCESS, payload: data }),
    getAllBadgeError: () => ({ type: BadgeMap.GET_ALL_BADGE_ERROR }),

    createBadgeStart: () => ({ type: BadgeMap.CREATE_BADGE_START }),
    createBadgeSuccess: (data) => ({ type: BadgeMap.CREATE_BADGE_SUCCESS, payload: data }),
    createBadgeError: (errors) => ({ type: BadgeMap.CREATE_BADGE_ERROR, payload: { errors } }),

    updateBadgeStart: () => ({ type: BadgeMap.UPDATE_BADGE_START }),
    updateBadgeSuccess: (data) => ({ type: BadgeMap.UPDATE_BADGE_SUCCESS, payload: data }),
    updateBadgeError: (errors) => ({ type: BadgeMap.UPDATE_BADGE_ERROR, payload: { errors } }),

    deleteBadgeStart: () => ({ type: BadgeMap.DELETE_BADGE_START }),
    deleteBadgeSuccess: (data) => ({ type: BadgeMap.DELETE_BADGE_SUCCESS, payload: data }),
    deleteBadgeError: (errors) => ({ type: BadgeMap.DELETE_BADGE_ERROR, payload: { errors } }),

    setSelectedBadge: (data) => ({ type: BadgeMap.SET_SELECTED_BADGE, payload: data }),

    getAllFilterBadge: (data) => ({ type: BadgeMap.GET_ALL_FILTER_BADGE_START, payload: data }),
    getAllFilterBadgeSuccess: (data) => ({ type: BadgeMap.GET_ALL_FILTER_BADGE_SUCCESS, payload: data }),
    getAllFilterBadgeError: () => ({ type: BadgeMap.GET_ALL_FILTER_BADGE_ERROR }),

    searchTextChange: (data) => ({ type: BadgeMap.SEARCH_TEXT_CHANGE, payload: data }),
    refreshBadgeList: () => ({ type: BadgeMap.REFRESH_BADGE_LIST }),
}