import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  updateUserAsync,
  createUserAsync,
  getUserDetailByIdAsync,
  getCountryDailCodeAsync
} from "../../redux/userManagementApi";
import { Link, Redirect, useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { showSuccessSnackbar } from "../../../snackBar/snackBar.action";
import Select from "react-select";
import { regexValidation } from "../../../../../_metronic/_helpers/RegexValidationHelpers";

const BasicDetailsForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userDetail, dailCode, isLoading, reDirect } = useSelector((state) => state.userManagement, shallowEqual);
  let [callingCode, setCallingCode] = useState([]);
  useEffect(() => {
    dispatch(getUserDetailByIdAsync(id))
    dispatch(getCountryDailCodeAsync());
  }, []);
  useEffect(() => {
    let arr = []
    dailCode.map((ele) => {
      arr.push({ value: ele.callingCode, label: ele.callingCode })
    })
    setCallingCode(arr);
  }, [dailCode]);
  const [file, setFile] = useState({ file: null, url: null });

  // let { countryList } = useSelector((state) => state.countryManagement, shallowEqual);
  // countryList = countryList.records;
  // let countriesArray = countryList.map((item) => {
  //   return { value: item._id, label: item.name };
  // });

  const BasicDetailsFormSchema = () =>
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Full name is required"),
      userName: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("User name is required")
        .matches(regexValidation.USERNAME_REGEX, "Invalid userName"),
      bio: Yup.string()
        .trim()
        // .min(3, "Minimum 3 characters")
        .max(250, "Maximum 250 characters"),
      // .required("Bio is required"),
      dob: Yup.string()
        .trim()
        .required("Date of Birth is required"),
      status: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Status is required"
        )
        .required("Status is required"),
      mobileNo: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Mobile Number is required"
        )
        .matches(
          regexValidation.MOBILE_NUMBER_REGEX,
          "Mobile Number is not valid"
        )
        .required("Mobile number is required"),
      dailCode: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Dail code is required"
        )
        .required("Dail code is required"),
      address: Yup.string()
        .trim()
        .notOneOf(
          ["null", "NULL", "Null", "Undefined", "undefined"],
          "Address is required"
        )
        .required("Address is required"),
      // anniversary: Yup.string()
      //   .trim()
      //   .required("Anniversary date is required"),
      // events: Yup.string()
      //   .trim()
      //   .required("Event date is required"),
    });

  let mobileNumbers = userDetail.mobileDetails;
  let dailCodes = (mobileNumbers) ? mobileNumbers.dailCode : '+91';
  let mobileNo = (mobileNumbers) ? mobileNumbers.mobileNo : '';

  let locationDetail = userDetail.location;
  let address = (locationDetail) ? locationDetail.address : '';
  let dob = userDetail.dob ? userDetail.dob.split("/").reverse().join("-") : '';

  const formik = useFormik({
    initialValues: {
      name: userDetail.name || "",
      userName: userDetail.userName || "",
      bio: userDetail.bio || "",
      dob: dob || "",
      specialDates: userDetail.specialDates || [],
      // anniversary: userDetail.anniversaryDate || "",
      // events: userDetail.specialEventDate || "",
      profilePicture: userDetail.profilePicture || "",
      status: userDetail.status || "",
      streaks: userDetail.streaks && userDetail.streaks.onePostPerDay ? userDetail.streaks.onePostPerDay : 0,
      mobileNo: mobileNo || "",
      dailCode: dailCodes || "+91",
      address: address || "",
    },
    enableReinitialize: true,
    validationSchema: BasicDetailsFormSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      let data = null;
      data = new FormData();
      if (file && file.file) {
        let randomString = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        let fileName = randomString + new Date().getTime() + '.jpg';
        data.append("profilePicture", file.file, fileName);
      } else if (file && file.url) {
        data.append("profilePicture", file.url);
      } else if (values && values.profilePicture) {
        data.append("profilePicture", values.profilePicture);
      }
      // else {
      //   return dispatch(showSuccessSnackbar("error", "Please select image", 3000));
      // }

      if (values.specialDates && values.specialDates.length === 1 && values.specialDates[0].label === "") {
        return dispatch(showSuccessSnackbar("error", "Please enter special date lable", 3000));
      }
      if (values.specialDates && values.specialDates.length === 2) {
        if (values.specialDates[0].label === "" || values.specialDates[1].label === "") {
          return dispatch(showSuccessSnackbar("error", "Please enter special date lable", 3000));
        }
        if (values.specialDates[0].label === values.specialDates[1].label) {
          return dispatch(showSuccessSnackbar("error", "Please enter different special date lable", 3000));
        }
      }

      data.append("name", values.name);
      data.append("userName", values.userName);
      data.append("bio", values.bio);
      data.append("dob", new Date(values.dob).toLocaleDateString());
      data.append("specialDates", JSON.stringify(values.specialDates));
      // data.append("anniversary", values.anniversary);
      // data.append("events", values.events);
      data.append("streaks", values.streaks);
      data.append("mobileNo", values.mobileNo);
      data.append("dailCode", values.dailCode ? values.dailCode : "+91");
      data.append("status", values.status);
      data.append("address", values.address);
      if (!userDetail._id) {
        return dispatch(createUserAsync(data));
      }
      if (userDetail._id) {
        dispatch(updateUserAsync(data, userDetail._id));
      }
    },
  });
  // const gender = [
  //   { value: "Male", label: "Male" },
  //   { value: "Female", label: "Female" },
  //   { value: "notSpecified", label: "Not specified" },
  // ];
  const status = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  // const selected_gender_option = {
  //   value: userDetail.gender,
  //   label: userDetail.gender,
  // };
  // const selected_county_option = {
  //   value: userDetail.country,
  //   label: userDetail.countryName,
  // };
  // const selected_club_option = {
  //   value: userDetail.club,
  //   label: userDetail.clubName,
  // };

  const handleStatusChange = (events) => {
    formik.setFieldValue("status", events.value);
  };
  const handleDailCodeChange = (events) => {
    formik.setFieldValue("dailCode", events.value);
  };
  // const handleGenderChange = (events) => {
  //   formik.setFieldValue("gender", events.value);
  // };
  // const handleCountryChange = (events) => {
  //   formik.setFieldValue("country", events.value);
  // };
  // const handleContactNumber = (e) => {
  //   formik.setFieldValue("contactNumber", e);
  // };

  const handleSpecialDateChange = (events, date) => {
    let specialDate = userDetail.specialDates;
    specialDate.map((ele) => {
      if (ele.label === events.target.name && ele.date === date) {
        ele.date = new Date(events.target.value).toLocaleDateString();
      }
    })

    formik.setFieldValue("specialDates", specialDate);
  };

  const handleSpecialDateLabelChange = (events, lable, date) => {
    let specialDate = userDetail.specialDates;
    specialDate.map((ele) => {
      if (ele.label === lable && ele.date === date) {
        ele.label = events.target.value;
      }
    })

    formik.setFieldValue("specialDates", specialDate);
  };

  const handleDOBChange = (events) => {
    formik.setFieldValue("dob", new Date(events.target.value).toLocaleDateString());
    userDetail.dob = new Date(events.target.value).toLocaleDateString()
  };

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  if (reDirect) {
    return <Redirect to="/users-management/users" />;
  }

  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-6-as">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12 text-center mb-4">
                    <div
                      className="pro_img"
                      style={{ backgroundImage: `url(${file.url ? file.url : userDetail && userDetail.profilePicture ? userDetail.profilePicture : "https://test-bucketstaging.s3.us-east-2.amazonaws.com/fulImage/1656417459984blank.png"})` }}
                    >
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={uploadImage}
                      />
                      <div className="edt_img_btn">
                        <span className="material-icons">edit</span>EDIT
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      placeholder="Full Name"
                      type="text"
                      className={`form-control`}
                      name="name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.name}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">User Name</label>
                    <input
                      placeholder="User Name"
                      type="text"
                      className={`form-control`}
                      name="userName"
                      {...formik.getFieldProps("userName")}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.userName}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="form-group">
                    <label className="form-label">Mobile No</label>

                    <Select classNamePrefix="react-select" name="dailCode" placeholder="Select Dail Code" className={`form-control border-0 p-0 `} options={callingCode}
                      value={[
                        {
                          value: formik.values.dailCode,
                          label: formik.values.dailCode,
                        },
                      ]}
                      onChange={(e) => {
                        handleDailCodeChange(e)
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#DCF4E4",
                          primary75: "#DCF4E4",
                          primary50: "#DCF4E4",
                          primary: "#50C878",
                        },
                      })}
                    />
                    {formik.touched.dailCode && formik.errors.dailCode ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.dailCode}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-4 ">
                  <div className="form-group">
                    <label className="form-label"></label>
                    <input
                      placeholder="Mobile Number"
                      type="text"
                      className={`form-control`}
                      style={{ marginTop: "7px" }}
                      name="mobileNo"
                      {...formik.getFieldProps("mobileNo")}
                    // value={formik.values.mobileNo}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.mobileNo}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">DOB</label>
                    <input
                      placeholder="DOB"
                      type="date"
                      className={`form-control`}
                      name="dob"
                      onChange={(e) => handleDOBChange(e)}
                      value={userDetail.dob ? userDetail.dob.split("/").reverse().join("-") : ''}
                    />
                    {formik.touched.dob && formik.errors.dob ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.dob}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {userDetail?.specialDates?.map((ele, i) => {
                  return (
                    <div className="col-lg-6" key={i}>
                      <div className="form-group">
                        {/* <label className="form-label">{ele.label}</label> */}
                        <input placeholder="Special Date" type="text" className={`form-control`} name={ele.label} value={ele.label} onChange={(e) => handleSpecialDateLabelChange(e, ele.label, ele.date)} />
                        <input
                          placeholder={ele.label}
                          type="date"
                          className={`form-control`}
                          name={ele.label}
                          onChange={(e) => handleSpecialDateChange(e, ele.date)}
                          value={ele.date.split("/").reverse().join("-")}
                        />
                      </div>
                    </div>
                  )
                })}

                {/* <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Anniversary</label>
                    <input
                      placeholder="anniversary"
                      type="date"
                      className={`form-control`}
                      name="anniversary"
                      {...formik.getFieldProps("anniversary")}
                    />
                    {formik.touched.anniversary && formik.errors.anniversary ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.anniversary}</div>
                      </div>
                    ) : null}
                  </div>
                </div> */}

                {/* <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Event</label>
                    <input
                      placeholder="Event"
                      type="date"
                      className={`form-control`}
                      name="events"
                      {...formik.getFieldProps("events")}
                    />
                    {formik.touched.events && formik.errors.events ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.events}</div>
                      </div>
                    ) : null}
                  </div>
                </div> */}

                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <input
                      placeholder="Bio"
                      type="text"
                      className={`form-control`}
                      name="bio"
                      {...formik.getFieldProps("bio")}
                    />
                    {formik.touched.bio && formik.errors.bio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.bio}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <textarea
                      placeholder="Address"
                      type="text"
                      className={`form-control`}
                      name="address"
                      rows="3"
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.address}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Streaks</label>
                    <input
                      placeholder="Streaks"
                      type="text"
                      className={`form-control`}
                      name="streaks"
                      {...formik.getFieldProps("streaks")}
                      disabled
                    />
                    {formik.touched.streaks && formik.errors.streaks ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.streaks}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="pho_14_500">Status</label>
                    <Select
                      classNamePrefix="react-select"
                      name="status"
                      placeholder="Select Status"
                      className={`form-control border-0 p-0 `}
                      options={status}
                      value={[
                        {
                          value: formik.values.status,
                          label: formik.values.status,
                        },
                      ]}
                      onChange={(e) => {
                        handleStatusChange(e)
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#DCF4E4",
                          primary75: "#DCF4E4",
                          primary50: "#DCF4E4",
                          primary: "#50C878",
                        },
                      })}
                    />
                    {formik.touched.status && formik.errors.status ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.status}</div>
                      </div>
                    ) : null}
                  </div>
                </div>

              </div>

              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                <div className="form-group mr-5 mb-1 mt-2">
                  <Link className="btn btn-outline-blue" to="/users-management/users">
                    Close
                  </Link>
                </div>
                <div className="form-group mr-5 mb-1 mt-2">
                  <button
                    type="submit"
                    className="btn btn-blue spinnerBtn"
                    disabled={isLoading}
                  >
                    <span>{userDetail._id ? "Update" : "Add"}</span>
                    {isLoading && (
                      <div className="ml-3 basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default BasicDetailsForm;
