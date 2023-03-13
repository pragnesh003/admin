import React, { useEffect, useRef } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getAllCountryAsync,
  CountryManagementActions,
  // getAllCountrysAsync,
} from "../redux";
import CountryManagementTable from "./countryManagementDetail/countryManagementTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

export function CountryManagement() {
  const dispatch = useDispatch();
  const searchCountryRef = useRef();
  const history = useHistory();
  const type = "COUNTRY";
  const { refreshCountryList, searchBy, searchText } = useSelector(
    (state) => state.countryManagement,
    shallowEqual
  );
  useEffect(() => {
    dispatch(CountryManagementActions.setSelectedCountry(null));
    if (searchCountryRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(CountryManagementActions.refreshCountryList());
        }
      };
      let input = searchCountryRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(CountryManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);
  useEffect(() => {
    if (refreshCountryList) {
      dispatch(getAllCountryAsync(searchBy, searchText, type));
    }
  }, [dispatch, refreshCountryList, searchBy, searchText]);
  useEffect(() => {
    dispatch(getAllCountryAsync());
  }, [dispatch]);

  const onAddClick = () => {
    history.push("/country-management/add-country");
  };

  const onSearchTextChange = (e) => {
    dispatch(CountryManagementActions.searchTextChange(e.target.value));
  };
  return (
    <>
      <Card>
        <CardHeader title="Country Management">
          <CardHeaderToolbar>
            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
              <form
                className="subheader_filter"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <div className="form-group mr-5 mb-1 mt-2">
                    <button
                      className="btn_new btn-sm"
                      type="button"
                      onClick={() => onAddClick()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="form-group mr-3 mb-1">
                    <input
                      name="Search"
                      placeholder="Search. . ."
                      type="text"
                      className="form-control"
                      value={searchText}
                      onChange={onSearchTextChange}
                      ref={searchCountryRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CountryManagementTable />
      </Card>
    </>
  );
}
