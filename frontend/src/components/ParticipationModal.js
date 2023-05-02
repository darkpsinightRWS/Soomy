import React, { useState, useEffect, useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  createParticipation,
  getRoomParticipations,
  getUserAndRoomParticipation,
} from "../redux/participationSlice";
import { updateRoom, fetchRoom } from "../redux/roomSlice";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
const ParticipationModal = (props) => {
  const dispatch = useDispatch();
  const [firstFieldset, setFirstFieldset] = useState(true);
  const [secondFieldset, setSecondFieldset] = useState(false);
  const [show, setShow] = useState(true);
  const [verif, setVerif] = useState(false);
  const participation = useSelector((state) => state.participation);
  const auction = props.room;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { loadingcreateParticipation, createParticipationErrors } =
    participation;

  return (
    <Modal {...props} centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              <div className="circle-icon">
                <i className="fi fi-rr-coins"></i>
              </div>
            </Modal.Header>
            <Modal.Body>
              <h4 className="modal-title text-center w-100 my-0">
                Informations de Participation
              </h4>
              <fieldset className={`${firstFieldset ? null : "d-none"}`}>
                <table className="table table-bordered mt-2 mb-1">
                  <tbody>
                    <tr>
                      <td className="black">Enchère :</td>
                      <td className="black"> {auction?.product?.title} </td>
                    </tr>
                    <tr>
                      <td className="black">Date de début :</td>
                      <td className="black">
                        {format(new Date(), "dd/MM/yyyy,HH:mm")}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Sous total : </td>
                      <td className="yellow">
                        {auction?.participationPrice} DT{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Total : </td>
                      <td className="yellow">
                        {auction?.participationPrice} DT{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />

                {auction && (
                  <div className="check-payment p-0 w-100">
                    <PayPalScriptProvider options={{ "client-id": "test" }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value:
                                    auction?.participationPrice?.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            const captures =
                              details.purchase_units[0].payments.captures;
                            dispatch(
                              createParticipation({
                                type: "participation",
                                total: parseFloat(captures[0].amount.value),
                                user: userInfo?._id,
                                email: userInfo?.email,
                                service:
                                  details?.purchase_units[0]?.soft_descriptor,
                                image: auction?.product?.image?.imageURL,
                                montant: auction?.participationPrice,
                                status: captures[0].status,
                                ref: captures[0]?.id,
                                name: auction?.product?.title,
                                prix: auction?.product?.prix,
                                room: auction?._id,
                                category: auction?.roomCategory,
                                username: userInfo?.username,
                              })
                            ).then(({ payload, error }) => {
                              if (!error) {
                                setFirstFieldset(false);
                                setSecondFieldset(true);
                                setVerif(true);
                                dispatch(
                                  updateRoom({
                                    id: auction?._id,
                                    data: {
                                      participation: auction.participation + 1,
                                    },
                                  })
                                );
                              }
                            });
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
                <div>
                  {loadingcreateParticipation ? (
                    <div className="col-md-12 align-items-center jusify-content-center d-flex">
                      <div className="spinner-border mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : createParticipationErrors ? (
                    <div className="alert alert-danger" role="alert">
                      {createParticipationErrors}
                    </div>
                  ) : null}
                </div>
              </fieldset>
              <fieldset className={`${secondFieldset ? null : "d-none"}`}>
                <div className="form-card">
                  <div className="row justify-content-center text-center"></div>
                  <br />
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-9 text-center">
                      <h4 className=" text-center">
                        Votre inscription a été payé avec succés
                      </h4>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </fieldset>
            </Modal.Body>
            <Modal.Footer style={{ flexWrap: "nowrap" }}>
              <button
                className="btn btn-outline-cancel w-100"
                onClick={(e) => {
                  e.preventDefault()
                  setShow(false);
                  props.participationCallback(show);
                }}
              >
                Ok
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ParticipationModal;
