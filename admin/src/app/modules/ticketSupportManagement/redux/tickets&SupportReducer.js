import { TicketsAndSupportMap } from "./tickets&SupportAction";

const initialState = {
  isLoading: false,
  refreshAllTickets: true,
  getAllTicketsList: {},
  skip: 0,
  limit: 10,
  createFaqModal: false,
  selectedTicket: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TicketsAndSupportMap.GET_ALL_TICKETS_START: {
      return {
        ...state,
        isLoading: true,
        refreshAllTickets: true,
      };
    }
    case TicketsAndSupportMap.GET_ALL_TICKETS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshAllTickets: false,
        getAllTicketsList: action.payload,
      };
    }
    case TicketsAndSupportMap.GET_ALL_TICKETS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshAllTickets: false,
      };
    }
    case TicketsAndSupportMap.ADD_COMMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TicketsAndSupportMap.ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshAllTickets: true,
        selectedTicket: {
          ...state.selectedTicket,
          ...action.payload,
        },
      };
    }
    case TicketsAndSupportMap.ADD_COMMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case TicketsAndSupportMap.CHANGE_TICKETS_STATUS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TicketsAndSupportMap.CHANGE_TICKETS_STATUS_SUCCESS: {
      return {
        ...state,
        refreshAllTickets: true,
        isLoading: false,
        selectedTicket: {
          ...state.selectedTicket,
          ...action.payload,
        },
      };
    }
    case TicketsAndSupportMap.CHANGE_TICKETS_STATUS_ERROR: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshAllTickets: true,
        selectedTicket: {
          ...state.selectedTicket,
          ...action.payload,
        },
      };
    }
    case TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TicketsAndSupportMap.SET_TICKET_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshAllTickets: true,
      };
    }
    case TicketsAndSupportMap.SET_SELECTED_TICKET: {
      return {
        ...state,
        selectedTicket: action.payload,
      };
    }
    case TicketsAndSupportMap.CREATE_FAQ_MANAGEMENT_CLOSE: {
      return {
        ...state,
        createFaqModal: false,
      };
    }
    case TicketsAndSupportMap.CREATE_FAQ_MANAGEMENT_SHOW: {
      return {
        ...state,
        createFaqModal: true,
      };
    }
    default:
      return { ...state };
  }
};
