/* import { faCheckCircle, faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
import React, { useState ,useEffect} from "react";
/* import card1 from "../assets/card-1.png";
import card2 from "../assets/card-2.png";
import card3 from "../assets/card-3.png"; */
import { createCredit, setCloseModalCredit, setsold } from "../redux/userSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

const CreditModal = (props) => {
  const [verif, setVerif] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [firstFieldset, setFirstFieldset] = useState(true);
  const [secondFieldset, setSecondFieldset] = useState(false);
  const [thirdFieldset, setThirdFieldset] = useState(false);
  const [service, setService] = useState();
  const [montant, setMontant] = useState();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const toggleProgressBar = () => {
    if (secondFieldset && verif) {
      setSecondFieldset(false);
      setThirdFieldset(true);
      setPersonal(true);
      setMontant();
    } else if (firstFieldset) {
      setFirstFieldset(false);
      setSecondFieldset(true);
      setVerif(true);
    }
  };
  const clearModal = () => {
    setSecondFieldset(false)
    setThirdFieldset(false)
    setPersonal(false)
    setThirdFieldset(false)
    setFirstFieldset(true)
    setSecondFieldset(false)
    setVerif(false)
    setMontant()
    setService();
    dispatch(setCloseModalCredit())
  };
 

  return (
    <Modal
      {...props}
      onHide={clearModal}
      centered
    >
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              {/*<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>*/}
              <div className="circle-icon">
              <i className="fi fi-rr-coins"></i>

              </div>
            </Modal.Header>
            <Modal.Body className="credit-modal-body">
              <ul id="progressbarCredit">
                <li className="active" id="montant"></li>
                <li id="pay" className={`${verif ? "active" : null}`}></li>
                <li
                  id="success"
                  className={`${personal ? "active" : null}`}
                ></li>
              </ul>
              <fieldset className={`${firstFieldset ? null : "d-none"}`}>
                <h4 className="modal-title" id="exampleModalCenterTitle">
                  Votre solde est :{" "}
                  <span>
                    {props.montant == null
                  ? userInfo?.credit?.montant?.toFixed(2)
                  : props.montant?.toFixed(2)} DT
                  </span>
                </h4>
                <h6>Valable pendant 20 jours depuis votre dernière recharge
de crédit</h6>
                <br />
                <h4 className="warning-text" id="exampleModalCenterTitle">
                  Recharger votre solde:
                </h4>
                <div className="check-payment">
                  <div className="input-group mb-3 d-flex justify-content-center flex-nowrap">
                    <input
                      className="credit-input"
                      type="number"
                      min="5"
                      placeholder="Montant"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setMontant(e.target.value)}
                    />
                    <span className="input-group-text" id="basic-addon2">
                      DT
                    </span>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="paypal"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <label className="form-check-label" for="exampleRadios1">
                     {/*  <img src={card1} alt="" srcset="" />  */}Carte bancaire
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="option2"
                    />
                    <label className="form-check-label" for="exampleRadios2">
                    {/*   <img src={card2} alt="" srcset="" /> */} E-dinar
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios3"
                      value="option3"
                    />
                    <label className="form-check-label" for="exampleRadios3">
                     {/*  <img src={card3} alt="" srcset="" /> */} Carte de recharge
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  name="next"
                  className="next action-button btn w-100"
                  onClick={toggleProgressBar}
                  disabled={service&&(montant >= 5) ? false : true}
                >
                  Suivant
                </button>
              </fieldset>
              <fieldset className={`${secondFieldset ? null : "d-none"}`}>
                <table className="table table-bordered mb-1">
                  <tbody>
                    <tr>
                      <td className="black">Votre crédit actuel:</td>
                      <td className="black">
                        {" "}
                        {props.montant == null
                  ? userInfo?.credit?.montant?.toFixed(2)
                  : props.montant?.toFixed(2)}{" "}
                       DT{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Montant de recharge :</td>
                      <td className="black">{montant} DT</td>
                    </tr>
                    <tr>
                      <td className="black">Moyen de paiement :</td>
                      <td className="yellow">{service}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                {service && secondFieldset ? (
                  <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: montant.toString(),
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
                            createCredit({
                              type: "credit",
                              total: parseFloat(captures[0].amount.value),
                              user: userInfo._id,
                              service:
                                details.purchase_units[0].soft_descriptor,
                              montant: montant,
                              status: captures[0].status,
                              ref: captures[0].id,
                            })
                          ).then((data) => {
                            if (data.payload.status === "COMPLETED") {
                              setSecondFieldset(false);
                              setThirdFieldset(true);
                              setPersonal(true);
                              dispatch(setsold(data.payload.montant));
                            }
                          });
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                ) : null}

                <button
                  type="button"
                  name="next"
                  className="next action-button btn btn-primary btn-color w-100"
                  onClick={() => {
                    setFirstFieldset(true);
                    setSecondFieldset(false);
                  }}
                >
                  Retour
                </button>
              </fieldset>
              <fieldset className={`${thirdFieldset ? null : "d-none"}`}>
                <div className="form-card">
                  <div className="row justify-content-center text-center">
                  {/*   <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ color: "#31C626" }}
                    /> */}
                  </div>
                  <br />
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-9 text-center">
                      <h3 className="warning-connection">
                      Vous avez rechargé votre crédit avec un montant de{" "}
                        <span className="color-pink">
                          {Number(montant)?.toFixed(2)}{" "}
                          DT{" "}
                        </span>
                      </h3>
                      <p className="warning-text">
                      Nouveau crédit  :{" "}
                        <span>
                          {
                            userInfo?.credit?.montant?.toFixed(2)}{" "}
                          DT
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </fieldset>
            </Modal.Body>
            <Modal.Footer className={`${thirdFieldset ? null : "d-none"}`} style={{flexWrap:"nowrap"}}>
                <button className="btn btn-outline-cancel w-100" onClick={()=>{clearModal}}>Ok</button>
              </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreditModal;