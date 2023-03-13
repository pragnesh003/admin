export const CountryManagementMap = {
  GET_ALL_COUNTRY_START: "GET_ALL_COUNTRY_START",
  GET_ALL_COUNTRY_SUCCESS: "GET_ALL_COUNTRY_SUCCESS",
  GET_ALL_COUNTRY_ERROR: "GET_ALL_COUNTRY_ERROR",
  ADD_COUNTRY_START: "ADD_COUNTRY_START",
  ADD_COUNTRY_SUCCESS: "ADD_COUNTRY_SUCCESS",
  ADD_COUNTRY_ERROR: "ADD_COUNTRY_ERROR",
  SELECT_USER_DETAILS: "SELECT_USER_DETAILS",
  COUNTRY_FILTERS: "COUNTRY_FILTERS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_COUNTRY_LIST: "REFRESH_COUNTRY_LIST",
  SET_COUNTRY_BATCH_NUMBER: "SET_COUNTRY_BATCH_NUMBER",
  SELECT_COUNTRY_DETAILS: "SELECT_COUNTRY_DETAILS",
  GET_ALL_COUNTRIES_START: "GET_ALL_COUNTRIES_START",
  GET_ALL_COUNTRIES_SUCCESS: "GET_ALL_COUNTRIES_SUCCESS",
  GET_ALL_COUNTRIES_ERROR: "GET_ALL_COUNTRIES_ERROR",
  UPDATE_COUNTRY_START: "UPDATE_COUNTRY_START",
  UPDATE_COUNTRY_SUCCESS: "UPDATE_COUNTRY_SUCCESS",
  UPDATE_COUNTRY_ERROR: "UPDATE_COUNTRY_ERROR",
  DELETE_COUNTRY_START: "DELETE_COUNTRY_START",
  DELETE_COUNTRY_SUCCESS: "DELETE_COUNTRY_SUCCESS",
  DELETE_COUNTRY_ERROR: "DELETE_COUNTRY_ERROR",
  GET_COUNTRY_DAILCODE_START: "GET_COUNTRY_DAILCODE_START",
  GET_COUNTRY_DAILCODE_SUCCESS: "GET_COUNTRY_DAILCODE_SUCCESS",
  GET_COUNTRY_DAILCODE_ERROR: "GET_COUNTRY_DAILCODE_ERROR",
};

export const CountryManagementActions = {
  getAllCountryStart: (data) => ({
    type: CountryManagementMap.GET_ALL_COUNTRY_START,
    payload: data,
  }),
  getAllCountrySuccess: (data) => ({
    type: CountryManagementMap.GET_ALL_COUNTRY_SUCCESS,
    payload: data,
  }),
  getAllCountryError: (errors) => ({
    type: CountryManagementMap.GET_ALL_COUNTRY_ERROR,
    payload: { errors },
  }),
  deleteCountryStart: (data) => ({
    type: CountryManagementMap.DELETE_COUNTRY_START,
    payload: data,
  }),
  deleteCountrySuccess: (data) => ({
    type: CountryManagementMap.DELETE_COUNTRY_SUCCESS,
    payload: data,
  }),
  deleteCountryError: (errors) => ({
    type: CountryManagementMap.DELETE_COUNTRY_ERROR,
    payload: { errors },
  }),
  addCountryStart: (data) => ({
    type: CountryManagementMap.ADD_COUNTRY_START,
    payload: data,
  }),
  addCountrySuccess: (data) => ({
    type: CountryManagementMap.ADD_COUNTRY_SUCCESS,
    payload: data,
  }),
  addCountryError: (errors) => ({
    type: CountryManagementMap.ADD_COUNTRY_ERROR,
    payload: { errors },
  }),
  updateCountryStart: (data) => ({
    type: CountryManagementMap.UPDATE_COUNTRY_START,
    payload: data,
  }),
  updateCountrySuccess: (data) => ({
    type: CountryManagementMap.UPDATE_COUNTRY_SUCCESS,
    payload: data,
  }),
  updateCountryError: (errors) => ({
    type: CountryManagementMap.UPDATE_COUNTRY_ERROR,
    payload: { errors },
  }),
  getCountryStart: (data) => ({
    type: CountryManagementMap.GET_ALL_COUNTRIES_START,
    payload: data,
  }),
  getCountrySuccess: (data) => ({
    type: CountryManagementMap.GET_ALL_COUNTRIES_SUCCESS,
    payload: data,
  }),
  getCountryError: (errors) => ({
    type: CountryManagementMap.GET_ALL_COUNTRIES_ERROR,
    payload: { errors },
  }),
  applyFilters: (data) => ({
    type: CountryManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  refreshCountryList: () => ({ type: CountryManagementMap.REFRESH_COUNTRY_LIST }),
  searchTextChange: (data) => ({
    type: CountryManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  setSelectedCountry: (data) => ({
    type: CountryManagementMap.SELECT_COUNTRY_DETAILS,
    payload: data,
  }),
  setCountryBatchNumber: (data) => ({
    type: CountryManagementMap.SET_COUNTRY_BATCH_NUMBER,
    payload: data,
  }),
  getCountryDailCodeStart: (data) => ({
    type: CountryManagementMap.GET_COUNTRY_DAILCODE_START,
    payload: data,
  }),
  getCountryDailCodeSuccess: (data) => ({
    type: CountryManagementMap.GET_COUNTRY_DAILCODE_SUCCESS,
    payload: data,
  }),
  getCountryDailCodeError: (errors) => ({
    type: CountryManagementMap.GET_COUNTRY_DAILCODE_ERROR,
    payload: { errors },
  }),
};
