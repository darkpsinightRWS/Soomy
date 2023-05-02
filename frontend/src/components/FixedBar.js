import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setShowModal, setShowModalCredit } from "../redux/userSlice";
import { handleClose, handleShow } from "../redux/dashboardSlice";
import { slide as Menu } from "react-burger-menu";
const red = { color: "red" };
const green = { color: "green" };
const FixedBar = (props) => {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo, show } = user;

  const currentLocation = useLocation().pathname;
  const locationTest =
    currentLocation.toLowerCase().slice(0, 10) === "/dashboard" ||
    currentLocation.toLowerCase().slice(0, 8) === "/product" ||
    currentLocation.toLowerCase().slice(0, 15) === "/premiumproduct";

  const userLogout = () => {
   
      dispatch(logout()).then(() => navigate("/"));
    
  };

  return (
    <div>
      {userInfo && !locationTest ? (
        <div className="credit-button">
          <div className="fixed-bar" onClick={() => navigate("/")}>
            <i className="fi fi-rr-home"></i>
            <p>Accueil</p>
          </div>
          <div className="fixed-bar" onClick={() => dispatch(handleShow())}>
            <i className="fi fi-rr-search"></i>
            <p>Recherche</p>
          </div>
          <div className="fixed-bar" onClick={() => dispatch(setShowModal())}>
            <i className="fi fi-rr-user"></i>
            <p>Mon compte</p>
          </div>
          <div
            className="fixed-bar"
            onClick={() => dispatch(setShowModalCredit())}
          >
            <var>
              {userInfo?.credit?.montant.toFixed(2)}
              <sup>
                {" "}
                <i className="fi fi-rr-coins"></i>
              </sup>
            </var>
          </div>
        </div>
      ) : null}
      <div
        className="profile-menu d-lg-none"
        style={{
          left: "0",
          position: "fixed",
          width: `${isOpen ? "100%" : "0"}`,
          height: `${isOpen ? "100%" : "0"}`,
          top: "0",
          zIndex: "99999999",
        }}
      >
        <Menu
          isOpen={show}
          onStateChange={(state) => setOpen(state.isOpen)}
          burgerBarClassName={"inner-sidemenu"}
        >
          <Link
            style={{ textDecoration: "none" }}
            className={`nav-item nav-item-profile ${
              props.commande && "active"
            }`}
            id="v-pills-fav-tab"
            data-toggle="pill"
            to="/profile/commandes"
            role="tab"
            aria-controls="v-pills-fav"
            aria-selected="false"
          >
            Mes commandes
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            className={`nav-item nav-item-profile ${props.user && "active"}`}
            id="v-pills-profile-tab"
            data-toggle="pill"
            to="/profile/auctions"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Mes enchères
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            className={`nav-item nav-item-profile ${
              props.transaction && "active"
            }`}
            id="v-pills-messages-tab"
            data-toggle="pill"
            to="/profile/transactions"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Transactions
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            className={`nav-item nav-item-profile ${props.profile && "active"}`}
            id="v-pills-home-tab"
            data-toggle="pill"
            to="/profile"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            Infos. du compte
          </Link>
          <a
            style={{ textDecoration: "none" }}
            className="nav-item nav-item-profile"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#"
            onClick={userLogout}
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Déconnexion
          </a>
        </Menu>
      </div>
    </div>
  );
};

export default FixedBar;
