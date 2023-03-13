export const TicketsAndSupportMap = {
  GET_ALL_TICKETS_START: "GET_ALL_TICKETS_START",
  GET_ALL_TICKETS_SUCCESS: "GET_ALL_TICKETS_SUCCESS",
  GET_ALL_TICKETS_ERROR: "GET_ALL_TICKETS_ERROR",
  CHANGE_TICKETS_STATUS_START: "CHANGE_TICKETS_STATUS_START",
  CHANGE_TICKETS_STATUS_SUCCESS: "CHANGE_TICKETS_STATUS_SUCCESS",
  CHANGE_TICKETS_STATUS_ERROR: "CHANGE_TICKETS_STATUS_ERROR",
  ADD_COMMENT_START: "ADD_COMMENT_START",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_ERROR: "ADD_COMMENT_ERROR",
  UPDATE_TICKETS_DETAILS_START: "UPDATE_TICKETS_DETAILS_START",
  UPDATE_TICKETS_DETAILS_SUCCESS: "UPDATE_TICKETS_DETAILS_SUCCESS",
  UPDATE_TICKETS_DETAILS_ERROR: "UPDATE_TICKETS_DETAILS_ERROR",
  SET_TICKET_BATCH_NUMBER: "SET_TICKET_BATCH_NUMBER",
  SET_SELECTED_TICKET: "SET_SELECTED_TICKET",
  CREATE_FAQ_MANAGEMENT_SHOW: "CREATE_FAQ_MANAGEMENT_SHOW",
  CREATE_FAQ_MANAGEMENT_CLOSE: "CREATE_FAQ_MANAGEMENT_CLOSE",
};

export const TicketsAndSupportActions = {
  getAllTicketsStart: (data) => ({
    type: TicketsAndSupportMap.GET_ALL_TICKETS_START,
    payload: data,
  }),
  getAllTicketsSuccess: (data) => ({
    type: TicketsAndSupportMap.GET_ALL_TICKETS_SUCCESS,
    payload: data,
  }),
  getAllTicketsError: (errors) => ({
    type: TicketsAndSupportMap.GET_ALL_TICKETS_ERROR,
    payload: { errors },
  }),

  addCommentStart: (data) => ({
    type: TicketsAndSupportMap.ADD_COMMENT_START,
    payload: data,
  }),
  addCommentSuccess: (data) => ({
    type: TicketsAndSupportMap.ADD_COMMENT_SUCCESS,
    payload: data,
  }),
  addCommentError: (errors) => ({
    type: TicketsAndSupportMap.ADD_COMMENT_ERROR,
    payload: { errors },
  }),

  changeTicketStatusStart: (data) => ({
    type: TicketsAndSupportMap.CHANGE_TICKETS_STATUS_START,
    payload: data,
  }),
  changeTicketStatusSuccess: (data) => ({
    type: TicketsAndSupportMap.CHANGE_TICKETS_STATUS_SUCCESS,
    payload: data,
  }),
  changeTicketStatusError: (errors) => ({
    type: TicketsAndSupportMap.CHANGE_TICKETS_STATUS_ERROR,
    payload: { errors },
  }),

  updateTicketsDetailsStart: (data) => ({
    type: TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_START,
    payload: data,
  }),
  updateTicketsDetailsSuccess: (data) => ({
    type: TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_SUCCESS,
    payload: data,
  }),
  updateTicketsDetailsError: (errors) => ({
    type: TicketsAndSupportMap.UPDATE_TICKETS_DETAILS_ERROR,
    payload: { errors },
  }),

  setTicketBatchNumber: (data) => ({
    type: TicketsAndSupportMap.SET_TICKET_BATCH_NUMBER,
    payload: data,
  }),

  setSelectedTicket: (data) => ({
    type: TicketsAndSupportMap.SET_SELECTED_TICKET,
    payload: data,
  }),
  createFaqModalClose: () => ({
    type: TicketsAndSupportMap.CREATE_FAQ_MANAGEMENT_CLOSE,
  }),
  createFaqModalShow: () => ({
    type: TicketsAndSupportMap.CREATE_FAQ_MANAGEMENT_SHOW,
  }),
};
