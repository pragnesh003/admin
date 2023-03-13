import React, { useState } from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import { useParams, Redirect, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
//import Select from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import {
  addCountryAsync,
  updateCountryAsync,
} from "../redux/countryManagementApi";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
//import CustomEditor from "../../CustomEditor/CustomEditor";

const AddCountry = () => {
  //const countryOptions = [];
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector(
    (state) => state.countryManagement,
    shallowEqual
  );
  const [file, setFile] = useState({
    file: selectedCountry?.flag,
    url: selectedCountry?.flag,
  });

  const { environmentLists } = useSelector((state) => state.environnment);
  if (!selectedCountry && params?.id !== undefined) {
    return <Redirect to="/country-management" />;
  }
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg",
    "image/svg+xml",
  ];

  const initialValues = {
    name: "",
    code: "",
    char: "",
    flag: null,
  };
  const redirectBack = () => {
    history.push("/country-management");
  };
  const addCountrySchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter country name"
      )
      .required("Please enter country name"),
    code: Yup.string()
      .trim()
      .required("Please enter country code")
      .max(3, "Maximum 3 characters")
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter country code"
      ),
    char: Yup.string()
      .trim()
      .required("Please enter country char")
      .max(3, "Maximum 3 characters")
      .min(2, "Minimum 2 characters")
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter country char"
      ),
    flag: Yup.mixed()
      .nullable()
      .required("Please select flag")
      .test(
        "fileSize",
        "File Size is too large",
        (value) =>
          (value &&
            typeof value.arrayBuffer === "function" &&
            value?.size <= environmentLists.flag_max_size_bytes) ||
          true
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          (value &&
            typeof value.arrayBuffer === "function" &&
            SUPPORTED_FORMATS.includes(value?.type)) ||
          true
      ),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          selectedCountry && params?.id !== undefined
            ? selectedCountry
            : initialValues
        }
        validationSchema={addCountrySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("code", values.code);
          formData.append("char", values.char);
          formData.append("flag", values.flag);

          if (selectedCountry && params?.id !== undefined) {
            dispatch(
              updateCountryAsync(
                formData,
                setSubmitting,
                resetForm,
                redirectBack
              )
            );
          } else {
            dispatch(
              addCountryAsync(formData, setSubmitting, resetForm, redirectBack)
            );
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Card>
            <CardHeader
              title={
                <div className="form-group m-0 d-flex align-items-center">
                  <Link className="btn btn-link px-0" to="/country-management">
                    <SVG
                      className="h-50 align-self-center"
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Navigation/Arrow-left.svg"
                      )}
                    />
                    Back
                  </Link>
                  <span className="pl-2">
                    {selectedCountry ? "Edit Country" : "Add Country"}
                  </span>
                </div>
              }
            ></CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Form>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        placeholder="Enter country name"
                        type="text"
                        autoComplete="off"
                        name="name"
                        className={
                          errors.name && touched.name
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {touched.name && errors.name ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.name}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country Code</label>
                      <input
                        placeholder="Enter country code (i.e. +1)"
                        type="text"
                        name="code"
                        autoComplete="off"
                        className={
                          errors.code && touched.code
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                      />
                      {touched.code && errors.code ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.code}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country Char</label>
                      <input
                        placeholder="Enter country char (i.e. US)"
                        type="text"
                        autoComplete="off"
                        name="char"
                        className={
                          errors.char && touched.char
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.char}
                      />
                      {touched.char && errors.char ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.char}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country Image</label>
                      <Field type="file">
                        {({ field }) => (
                          <input
                            placeholder="Select Country Image"
                            type="file"
                            name="flag"
                            accept=".png, .jpg, .jpeg, .svg, .JPG, .JPEG, .PNG, .SVG"
                            // {...field}
                            onChange={(e) => {
                              let reader = new FileReader();
                              let getFile = e.target.files[0];
                              reader.onloadend = () => {
                                setFieldValue("flag", getFile);
                              };

                              setFieldValue("flag", e.currentTarget.files[0]);
                              // uploadImage(e)
                              reader.readAsDataURL(getFile);

                              setFile({
                                url: URL.createObjectURL(
                                  e.currentTarget.files[0]
                                ),
                                file: e.currentTarget.files[0],
                              });
                            }}
                            className={
                              errors.flag && touched.flag
                                ? "form-control re_inputRouded is-invalid"
                                : "form-control re_inputRouded"
                            }
                          />
                        )}
                      </Field>
                      {touched.flag && errors.flag ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.flag}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-12 text-center mb-4">
                      <div className="module_img">
                        <Image
                          src={file?.url || process.env.REACT_APP_DEFAULT_IMAGE}
                          title="icon"
                          alt="Country"
                          className=""
                          fluid
                          name="countryImage"
                        />
                      </div>
                    </div>

                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <Link
                          className="btn btn-outline-blue"
                          to="/country-management"
                        >
                          Close
                        </Link>
                      </div>
                      <div className="mb-1 mt-2">
                        <Button
                          variant="blue"
                          className="px-5 defpddng spinnerBtn"
                          size="lg"
                          type="submit"
                        >
                          {selectedCountry && params?.id !== undefined
                            ? "Update"
                            : "Submit"}
                          {isSubmitting && (
                            <div className="ml-3 basic-verification-loader text-center">
                              {/* <CircularProgress /> */}
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};
export default AddCountry;
