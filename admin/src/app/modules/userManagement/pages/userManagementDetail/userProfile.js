import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUserDetailsAsync } from "../../redux";
import { Redirect, useParams } from "react-router-dom";
import { Card } from "../../../../../_metronic/_partials/controls";

const UserProfileView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userDetail, reDirect } = useSelector((state) => state.userManagement, shallowEqual);

  useEffect(() => {
    dispatch(getUserDetailsAsync(id))
  }, []);

  const file = { file: null, url: userDetail?.profilePicture };

  let mobileNumbers = userDetail.mobileDetails;
  let dailCodes = (mobileNumbers) ? mobileNumbers.dailCode : '+91';
  let mobileNo = (mobileNumbers) ? mobileNumbers.mobileNo : '';

  let userDetailAddress = userDetail ? userDetail.location : {};
  let address = userDetailAddress && userDetailAddress.address ? userDetailAddress.address : userDetailAddress ? userDetailAddress : "";

  let userDetailStreak = userDetail ? userDetail.streaks : {};
  let streaks = userDetailStreak && userDetailStreak.onePostPerDay != undefined ? userDetailStreak.onePostPerDay : userDetailStreak ? userDetailStreak : 0;

  if (reDirect) {
    return <Redirect to="/users-management/users" />;
  }

  return (
    <Card>
      {/* <CardHeader
        title={
          <div className="form-group m-0 d-flex align-items-center">
            <Link className="btn btn-link px-0" to="/users-management/users">
              <SVG className="h-50 align-self-center" src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")} />
              Back
            </Link>
            <span className="pl-2">User Details</span>
          </div>
        }
      ></CardHeader> */}
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-6-as">
            <form className="form def_form frmwtpddng"            >
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12 text-center mb-4">
                    <div
                      className="pro_img"
                      style={{ backgroundImage: `url(${file.url || "https://test-bucketstaging.s3.us-east-2.amazonaws.com/fulImage/1656417459984blank.png"})` }} >
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    {/* <input placeholder="Full Name" className={`form-control`} name="name" value={userDetail.name} disabled /> */}
                    <div className="form-control disabled" >{userDetail.name}</div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">User Name</label>
                    {/* <input placeholder="User Name" className={`form-control`} name="userName" value={userDetail.userName} disabled /> */}
                    <div className="form-control disabled" >{userDetail.userName}</div>
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="form-group">
                    <label className="form-label">Mobile No</label>
                    {/* <input placeholder="DailCode" className={`form-control`} name="dailCode" value={dailCodes} disabled /> */}
                    <div className="form-control disabled" >{dailCodes}</div>

                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="form-label"></label>
                    {/* <input placeholder="Mobile Number" className={`form-control`} style={{ marginTop: "7px" }} name="mobileNo" value={mobileNo} disabled /> */}
                    <div className="form-control disabled" style={{ marginTop: "7px" }}>{mobileNo}</div>

                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">DOB</label>
                    {/* <input placeholder="DOB" className={`form-control`} name="data" value={userDetail.dob} disabled /> */}
                    <div className="form-control disabled" >{userDetail.dob}</div>

                  </div>
                </div>

                {userDetail?.specialDates?.map((ele, i) => {
                  return (
                    <div className="col-lg-6" key={i}>
                      <div className="form-group">
                        <label className="form-label">{ele.label}</label>
                        {/* <input placeholder={ele.label} type="date" className={`form-control`} name={ele.label} value={ele.date.split("/").reverse().join("-")} disabled /> */}
                        <div className="form-control disabled" >{ele.date.split("/").reverse().join("-")}</div>
                      </div>
                    </div>

                  )
                })}

                {/* <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Anniversary</label>
                    <input placeholder="anniversary" type="date" className={`form-control`} name="anniversary" value={userDetail.anniversary} disabled />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Event</label>
                    <input placeholder="Event" type="date" className={`form-control`} name="events" value={userDetail.events} disabled />
                  </div>
                </div> */}



                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    {/* <input placeholder="Bio" className={`form-control`} name="bio" value={userDetail.bio} disabled /> */}
                    <div className="form-control disabled" style={userDetail.bio ? { height: 'auto' } : {}} >{userDetail.bio}</div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    {/* <textarea placeholder="Address" className={`form-control`} name="address" rows="3" value={userDetail.location} disabled /> */}
                    <div className="form-control disabled" style={address ? { height: 'auto' } : {}} >{address}</div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Streaks</label>
                    {/* <input placeholder="Streaks" className={`form-control`} name="streaks" value={userDetail.streaks} disabled /> */}
                    <div className="form-control disabled" >{streaks}</div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="pho_14_500">Status</label>
                    {/* <input placeholder="Status" className={`form-control`} name="status" value={userDetail.status} disabled /> */}
                    <div className="form-control disabled" >{userDetail.status}</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default UserProfileView;
