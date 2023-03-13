import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBadgeAsync, deleteBadgeAsync, getAllFilterBadgeAsync } from "../redux/badgeApi";
import BadgePagesTable from "./badgeDetail/badgeTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { BadgeActions } from "../redux/badgeAction";

export function BadgePages() {
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  const type = "BADGE";
  const searchBadgeRef = useRef();
  const [selectedID, setSelectedID] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const { refreshBadge, badgeLists, isLoading, searchBy, searchText } = useSelector(
    (state) => state.badge,
    shallowEqual
  );

  useEffect(() => {
    dispatch(BadgeActions.setSelectedBadge(null));
    if (searchBadgeRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(BadgeActions.refreshBadgeList());
        }
      };
      let input = searchBadgeRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(BadgeActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (refreshBadge) {
      dispatch(getAllFilterBadgeAsync(searchBy, searchText, type));
    }
  }, [dispatch, refreshBadge, searchBy, searchText]);

  useEffect(() => {
    dispatch(getAllBadgeAsync());
  }, [dispatch]);

  const onDeleteClick = (id) => {
    setSelectedID(id);
    deleteShow();
  };

  const onDeactiveClick = () => {
    dispatch(deleteBadgeAsync(selectedID._id));
    setSelectedID({});
    deleteClose();
  };

  const onSelectBadge = (badge) => {
    dispatch(BadgeActions.setSelectedBadge(badge));
    history.push(`/badge/add-badge`);
  };

  const onSearchTextChange = (e) => {
    dispatch(BadgeActions.searchTextChange(e.target.value));
  };

  return (
    <>
      <Card>
        <CardHeader title="Badge">
          <CardHeaderToolbar>
            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
              <form className="subheader_filter" onSubmit={(e) => e.preventDefault()}              >
                <div className="form-row">
                  <div className="form-group mr-5 mb-1 mt-2">
                    <button className="btn_new btn-sm" type="button" onClick={() => onSelectBadge()} >
                      Add
                    </button>
                  </div>
                  <div className="form-group mr-3 mb-1">
                    <input name="Search" placeholder="Search. . ." type="text" className="form-control" value={searchText} onChange={onSearchTextChange} ref={searchBadgeRef} />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <BadgePagesTable badgeLists={badgeLists} onSelectBadge={onSelectBadge} onDeleteClick={onDeleteClick} isLoading={isLoading} />
      </Card>

      <Modal
        show={DeleteModal}
        onHide={deleteClose}
        centered
        className="def_modal delete_modal"
      >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure want to deactivate?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={deleteClose}
                >
                  Close
                </button>
              </div>
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={onDeactiveClick}
                >
                  Yes, Deactivate
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
