import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams, Redirect, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { createBadgeAsync, updateBadgeAsync } from "../redux/badgeApi";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
// import CustomEditor from "../../CustomEditor/CustomEditor";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";
import Select from "react-select";

const AddTemplate = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const entities = [{ values: "", label: "" }];
  const { selectedBadge, templates } = useSelector(
    (state) => state.badge,
    shallowEqual
  );
  const [file, setFile] = useState({ file: null, url: selectedBadge?.image });

  if (!selectedBadge && params?.id !== undefined) {
    return <Redirect to="/badge" />;
  }
  if (selectedBadge && params?.id && templates) {
    templates.forEach((template) => {
      if (
        selectedBadge.badgeName &&
        template.templateName === selectedBadge.badgeName
      ) {
        template.templateEntities.forEach((entity) => {
          entities.push({ value: entity, label: entity });
        });
      }
    });
  }
  const initialValues = {
    title: "",
    description: "",
    dayValidity: 0,
    perDayPost: 0,
    image: ""
  };
  const redirectBack = () => {
    history.push("/badge");
  };

  const day = [
    { value: 1, label: "1 Day" },
    { value: 7, label: "7 Day" },
    { value: 30, label: "1 Month" },
    { value: 90, label: "3 Month" },
    { value: 180, label: "6 Month" },
    { value: 365, label: "1 Year" },
  ];

  const perDayPost = [
    { value: 1, label: "1 Video" },
    { value: 5, label: "5 Video" },
  ]


  const addBadgeSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Badge Title"
      )
      .required("Please enter Badge title"),
    description: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid Badge description"
      )
      .required("Please enter Badge description"),
    dayValidity: Yup.number()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined", 0],
        "Please select day validity"
      )
      .required("Please select day validity"),
    perDayPost: Yup.number()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined", 0],
        "Please select per day post"
      )
      .required("Please select per day post"),
  });

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          selectedBadge && params?.id !== undefined
            ? selectedBadge
            : initialValues
        }
        validationSchema={addBadgeSchema}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
          let data = null;
          data = new FormData();
          if (file && file.file) {
            let randomString = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 8; i++) {
              randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            let fileName = randomString + new Date().getTime() + '.jpg';

            data.append("image", file.file, fileName);
          } else if (values && values.image) {
            data.append("image", values.images);
          } else {
            return dispatch(showSuccessSnackbar("error", "Please select image", 3000));
          }
          data.append("title", values.title);
          data.append("description", values.description);
          data.append("dayValidity", values.dayValidity);
          data.append("perDayPost", values.perDayPost);
          setSubmitting(true);
          if (selectedBadge && params?.id !== undefined) {
            dispatch(
              updateBadgeAsync(data, setSubmitting, resetForm, redirectBack)
            );
          } else {
            dispatch(
              createBadgeAsync(data, setSubmitting, resetForm, redirectBack)
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
                  <Link className="btn btn-link px-0" to="/badge">
                    <SVG
                      className="h-50 align-self-center"
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Navigation/Arrow-left.svg"
                      )}
                    />
                    Back
                  </Link>
                  <span className="pl-2">
                    {selectedBadge ? "Edit Template" : "Add Template"}
                  </span>
                </div>
              }
            ></CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Form>
                    <div className="col-md-12 text-center mb-4">
                      <div
                        className="pro_img"
                        style={{ backgroundImage: `url(${file.url || "https://test-bucketstaging.s3.us-east-2.amazonaws.com/fulImage/1656417459984blank.png"})` }} >
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
                      <label className="form-label">Title</label>
                      <input
                        placeholder="Enter Title"
                        type="text"
                        disabled={selectedBadge && params?.id !== undefined}
                        name="title"
                        className={
                          errors.title && touched.title
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      {touched.title && errors.title ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {errors.title}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>

                      <textarea
                        placeholder="Enter Description"
                        type="text"
                        name="description"
                        rows="3"
                        className={
                          errors.description && touched.description
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      {touched.description && errors.description ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.description}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="col-lg-14">
                      <div className="form-group">
                        <label className="form-label">Day Validity</label>
                        <Select
                          classNamePrefix="react-select"
                          name="dayValidity"
                          placeholder="Select Day validity"
                          className={`form-control border-0 p-0 `}
                          options={day}
                          onChange={(e) => {
                            values.dayValidity = e.value;
                          }}
                          defaultValue={day.filter(({ value }) => value === values.dayValidity)}
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
                        {touched.dayValidity && errors.dayValidity ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.dayValidity}</div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-lg-14">
                      <div className="form-group">
                        <label className="form-label">Per Day Post</label>
                        <Select
                          classNamePrefix="react-select"
                          name="perDayPost"
                          placeholder="Select Per Day Post"
                          className={`form-control border-0 p-0 `}
                          options={perDayPost}
                          onChange={(e) => {
                            values.perDayPost = e.value;
                          }}
                          defaultValue={perDayPost.filter(({ value }) => value === values.perDayPost)}
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
                        {touched.perDayPost && errors.perDayPost ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.perDayPost}</div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                      <div className="mr-5 mb-1 mt-2">
                        <Link
                          className="btn btn-outline-blue"
                          to="/badge"
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
                          {selectedBadge && params?.id !== undefined
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
export default AddTemplate;
