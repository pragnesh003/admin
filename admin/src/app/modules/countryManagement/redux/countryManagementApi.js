import axios from "axios";
import { CountryManagementActions } from "./countryManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllCountryAsync = (searchBy, searchText, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { skip, limit } = getState().countryManagement;
      dispatch(CountryManagementActions.getAllCountryStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/getAll?skip=${skip}&limit=${limit}&column=${searchBy}&type=${type}&dir=&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        return dispatch(
          CountryManagementActions.getAllCountrySuccess(data.data)
        );
      }
      dispatch(CountryManagementActions.getAllCountryError());
      return dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(CountryManagementActions.getAllCountryError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const addCountryAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CountryManagementActions.addCountryStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/create`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(CountryManagementActions.addCountrySuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CountryManagementActions.addCountryError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CountryManagementActions.addCountryError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateCountryAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { selectedCountry } = getState().countryManagement;
      dispatch(CountryManagementActions.updateCountryStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/updateDetails/${selectedCountry._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.code === 200) {
        dispatch(CountryManagementActions.updateCountrySuccess(data.data));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CountryManagementActions.updateCountryError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CountryManagementActions.updateCountryError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteCountryAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CountryManagementActions.deleteCountryStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/delete/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.code === 200) {
        dispatch(CountryManagementActions.deleteCountrySuccess(data.data));
        return dispatch(showSuccessSnackbar("success", data.message, 3000));
      }
      dispatch(CountryManagementActions.deleteCountryError());

      return dispatch(showSuccessSnackbar("error", data.message, 3000));
    } catch (error) {
      dispatch(CountryManagementActions.deleteCountryError(error));
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const getCountryDailCodeAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(CountryManagementActions.getCountryDailCodeStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countries/getAllCountryDailCode`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (data.code === 200) {
        return await dispatch(CountryManagementActions.getCountryDailCodeSuccess(data.data));
      }
      dispatch(CountryManagementActions.getCountryDailCodeError());
      return await dispatch(showSuccessSnackbar("success", data.message, 3000));
    } catch (error) {
      dispatch(CountryManagementActions.getCountryDailCodeError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
