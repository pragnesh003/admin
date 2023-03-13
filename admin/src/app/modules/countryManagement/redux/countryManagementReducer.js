import { CountryManagementMap } from "./countryManagementAction";

const initialState = {
  isLoading: false,
  countryList: {},
  refreshCountryList: true,
  selectedCountry: null,
  searchBy: "",
  countries: [],
  searchText: "",
  skip: 0,
  limit: 10,
  dailCode: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CountryManagementMap.GET_ALL_COUNTRY_START: {
      return {
        ...state,
        isLoading: true,

      };
    }
    case CountryManagementMap.GET_ALL_COUNTRY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        countryList: action.payload,
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.GET_ALL_COUNTRY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.ADD_COUNTRY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CountryManagementMap.ADD_COUNTRY_SUCCESS: {
      return {
        ...state,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.ADD_COUNTRY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.UPDATE_COUNTRY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CountryManagementMap.UPDATE_COUNTRY_SUCCESS: {
      return {
        ...state,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.UPDATE_COUNTRY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.GET_ALL_COUNTRIES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CountryManagementMap.GET_ALL_COUNTRIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.GET_ALL_COUNTRIES_ERROR: {
      return {
        ...state,
        isLoading: false,
        countries: [],
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.SELECT_COUNTRY_DETAILS: {
      return {
        ...state,
        isLoading: false,
        selectedCountry: action.payload,
      };
    }
    case CountryManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
        refreshCountryList: true
      };
    }
    case CountryManagementMap.SET_COUNTRY_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.REFRESH_COUNTRY_LIST: {
      return {
        ...state,
        skip: 0,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.DELETE_COUNTRY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CountryManagementMap.DELETE_COUNTRY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCountryList: true,
      };
    }
    case CountryManagementMap.DELETE_COUNTRY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshCountryList: false,
      };
    }
    case CountryManagementMap.GET_COUNTRY_DAILCODE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CountryManagementMap.GET_COUNTRY_DAILCODE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dailCode: action.payload,
      };
    }
    case CountryManagementMap.GET_COUNTRY_DAILCODE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
