import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Footer from "../../../components/footer/Footer";
import Card from "../../../components/cards/Card";
import CarouselBootstrap from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import WinnerModal from "../../../components/WinnerModal";
import ConnectionAlert from "../../../components/ConnectionAlert";
import SortirModal from "../../../components/SortirModal";
import PurchaseModal from "../../../components/DirectPurchase.js";
import BanModal from "../../../components/BanModal.js";
import FreeCreditModal from "../../../components/FreeCreditModal";
import CustomRightArrow from "../../../components/CustomRightArrow";
import CustomLeftArrow from "../../../components/CustomLeftArrow";
import CarouselMulti from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from "date-fns";
import {
  setsold,
  deleteBookmarks,
  updateBookmarks,
  setShowModalCredit,
} from "../../../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchRoom,
  updateflag,
  updateRoom,
  cleanRoom,
} from "../../../redux/roomSlice";
import { useCountdown } from "../../../components/Countdown";
import gold from "../../../assets/images/gold.png";
import silver from "../../../assets/images/silver.png";
import copper from "../../../assets/images/bronze.png";
import ShowCounter from "../../../components/ShowCounter";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import ParticipationModal from "../../../components/ParticipationModal";
import {
  setFreeCredit
} from "../../../redux/participationSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
let socket;
const CustomToastWithLinkAjout = () => (
  <div>
    <p>⭐ Ajouté aux favoris! </p>
    <Link
      style={{ textDecoration: "none", color: "black", marginLeft: "10px" }}
      to="/profile/auctions"
    >
      Voir favoris{" "}
      {/*  <FontAwesomeIcon
        icon={faAngleRight}
        style={{ color: "white", marginLeft: "5px" }}
      /> */}
    </Link>
  </div>
);
const CustomToastWithLinkSupprimer = () => (
  <div style={{ textAlign: "center" }}>
    <p>⭐ supprimé des favoris! </p>
    <Link
      style={{ textDecoration: "none", color: "black", marginLeft: "10px" }}
      to="/profile/auctions"
    >
      Voir favoris{" "}
      {/*  <FontAwesomeIcon
        icon={faAngleRight}
        style={{ color: "white", marginLeft: "5px" }}
      /> */}
    </Link>
  </div>
);
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1500, min: 1100 },
    items: 3,
  },
  mobile: {
    breakpoint: { max:1100, min: 550 },
    items: 2,
  },
  smallmobile: {
    breakpoint: { max:550, min: 0 },
    items: 1,
  },
};
const PremiumProduct = (props) => {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(false);
  const [loaderCarousel, setLoaderCarousel] = useState(false);
  const [participationLoader, setParticipationLoader] = useState(false);
  const [participationState, setParticipationState] = useState(null);
  const [userName, setUser] = useState("");
  const [photo, setPhoto] = useState("");
  const [disable, setDisable] = useState(false);
  const [iswinner, setisWinner] = useState(false);
  const [isloser, setIsLoser] = useState(false);
  const [users, setUsers] = useState([]);
   const [participationNumber, setParticipation] = useState(0);
  const [modalFreeCredit,setModalFreeCredit] = useState(false)
  const [price, setPrice] = useState(0);
  const [showWinner, setShowWinner] = useState(false);
  const [showDirectPurchase, setShowDirectPurchase] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState();
  const [userId, setUserId] = useState("");
  const [timer, setTimer] = useState(600);
  const [showAlert, setShowAlert] = useState(false);
  const [showMise, setShowMise] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    userInfo,
    isAuth,
    montant,
    updateBookmarksLoading,
    updateBookmarksErrors,
  } = useSelector((state) => state.user);
  const { participation, freeCredit } = useSelector((state) => state.participation);
  const { auction } = useSelector((state) => state.room);
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(auction ? auction.startDate : null)
  );
  const dispatch = useDispatch();


  const [width, setWidth] = useState(0);
  const [widthInner, setWidthInner] = useState(window.innerWidth);
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref.current?.clientHeight)
  })
  const myRef = useRef(null);
  const refCarousel = useRef(null);
  const chunkSize =
    widthInner > 1900
      ? 5
      : widthInner > 1400
      ? 4
      : widthInner < 1400 && widthInner > 767
      ? 3
      : widthInner < 767 && widthInner > 450
      ? 2
      : 1;
  const params = useParams();
  const productId = params.id;
  useEffect(() => {
    if (
      auction &&
      days <= 0 &&
      hours <= 0 &&
      minutes <= 0 &&
      seconds <= 0 &&
      auction.status === "pending"
    ) {
      if (Math.floor((participationNumber/auction?.capacity)*100) === 100) {
        dispatch(
          updateRoom({ id: auction?._id, data: { status: "enable" } })
        ).then(() => {
          dispatch(fetchRoom(auction?._id));
        });
      }
    }
  }, [days, hours, minutes, seconds]);
  useEffect(() => {
    if(auction){axios.get(`/participations/getNumberOfParticipations/${auction?._id}`).then(res=>
     setParticipation(res.data))}}, [auction]);
  useEffect(() => {
    socket = io();
  
    {
      if (auction && auction.status === "enable" && userInfo) {
        socket.emit(
          "join",
          {
            user: userInfo?.username,
            room: auction,
            montant: userInfo?.credit?.montant,
            app_id: userInfo?._id,
            photo: userInfo?.profile_img?.imageURL
          },
          (err) => {
            if (err) {
            }
          }
        ); //socket open on user join
        socket.emit("reset");
        return () => {
          // User leaves room
          socket.disconnect();
        };
      }
    }
  }, [auction]);
  useEffect(() => {
    if (userInfo && auction) {
      setParticipationLoader(true);
      axios
        .get(
          `/participations/getUserAndRoomParticipation/${userInfo?._id}/${auction?._id}`
        )
        .then((res) => {
          setParticipationLoader(false);
          setParticipationState(res.data);
          dispatch(setFreeCredit(res.data?.freeCredit))
        })
        .catch((err) => setParticipationLoader(false));
    }
  }, [dispatch, userInfo, auction, participation]);
  useEffect(() => {
    if (userInfo && auction) {
      socket.on("click", (data) => {
        setPrice(data.counter);
        setUser(data.user);
        setUserId(data.userId);
        setPhoto(data.photo);
      }); // receive users clicks
      /*   socket.on("directPurchase", (data) => {
        if (data.roomID === Room?._id) {
          setShowDirectPurchase(data.control);
        }
      });  */ // receive direct purchase flag
      socket.on("userwelcome", (data) => {
        dispatch(setsold(data.montant));
        setPrice(data.counter);
        setUser(data.user);
        setShowDirectPurchase(data.control);
        setPhoto(data.photo)
        dispatch(setFreeCredit(data.freeCredit))
      }); // receive room data on connect
      socket.on("conflictingConnection", (data) => {
        if (data.roomID === auction._id) {
          setShowAlert(data.control);
        }
      }); // conflict flag
      socket.on("leaveConnection", (data) => {
        if (data.roomID === auction._id) {
          setShowMise(data.control);
        }
      }); // leave connection

      socket.on("updateRoom", (data) => {
        if (data.roomID === auction._id) {
          dispatch(fetchRoom(data.roomID));
        }
      }); // update room for every user
      socket.on("buyProduct", (data) => {
        if (data.winner === userInfo._id) {
          setShowPurchaseModal(data.directBuyTrigger);
        }
        setShowDirectPurchase(data.control);
      });
      // premium purchase
      socket.on("winner", (data) => {
        
          setisWinner(true);
          setShowWinner(data.flag);
          dispatch(fetchRoom(auction._id));
          
      
      }); // end room flag
      socket.on("lost", (data) => {
        
          setIsLoser(true);
          setShowWinner(data.flag);
          dispatch(fetchRoom(auction._id));
      
      }); // end room flag
      socket.on("neutral", (data) => {
       setShowWinner(data.flag);
       dispatch(fetchRoom(auction._id));
      }); // end room flag

      socket.on("userjoin", (data) => {
        setPrice(data.counter);
        setUser(data.user);
        setPhoto(data.photo);
      }); // receive room data on room join
      socket.on("timer", (data) => {
        setTimer(data.countdown); // update timer
      });
      socket.on("updatecounter", (data) => {
        dispatch(setsold(data.montant));
      });
      socket.on("updateFreeCredit", (data) => {
      
        dispatch(setFreeCredit(data.freeCredit))
        if(data.freeCredit===0){
          setModalFreeCredit(true)
        }
      });
    }

    return () => {
      socket.off("click");
      socket.off("updateRoom");
      socket.off("userwelcome");
      socket.off("updatecounter");
      socket.off("updateFreeCredit");
      socket.off("userjoin");
      socket.off("winner");
      socket.off("lost");
      socket.off("neutral");
      socket.off("leaveConnection");
      socket.off("timer");
      socket.off("directPurchase");
      socket.off("conflictingConnection");
    };
  }, [auction, montant, userInfo]);
  const callbackPurchase = useCallback((room, user) => {
    socket.emit("validatePurchase", {
      roomID: room,
      userID: user,
    });
  }, []);
  const callbackHide = useCallback(() => {
    if (auction) {
      socket.emit("rejectPurchase", {
        roomID: auction._id,
        userID: userInfo?._id,
      });
    }
    setShowPurchaseModal(false);
  }, []);
  useLayoutEffect(() => {
    setWidth(refCarousel.current?.offsetWidth);
    setHeight(refCarousel.current?.offsetHeight);
  }, [refCarousel.current, carouselIndex, widthInner]);
  const HidePurchase = () => {
    if (auction) {
      socket.emit("rejectPurchase", {
        roomID: auction._id,
        userID: userInfo?._id,
      });
    }
    setShowPurchaseModal(false);
  };
  const callback = useCallback((count) => {
    setShowAlert(count);
  }, []);

  function convertSecondstoTime(given_seconds) {
    const dateObj = new Date(given_seconds * 1000);
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    const timeString =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return timeString;
  }
  const deleteBookmark = (elm) => {
    if (userInfo) {
      dispatch(
        deleteBookmarks({ id: userInfo._id, data: { bookmark: elm } })
      ).then(() => {
        if (!(updateBookmarksLoading && updateBookmarksErrors))
          toast(CustomToastWithLinkSupprimer, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        else if (updateBookmarksErrors)
          toast.erreur("erreur!", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      });
    }
  };

  const updateBookmark = (elm) => {
    if (userInfo) {
      dispatch(
        updateBookmarks({ id: userInfo._id, data: { bookmark: elm } })
      ).then(() => {
        if (!(updateBookmarksLoading && updateBookmarksErrors))
          toast(CustomToastWithLinkAjout, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        else if (updateBookmarksErrors)
          toast.error("erreur!", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      });
    }
  };
  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidthInner(window.innerWidth));

    /* passing an empty array as the dependencies of the effect
    
    will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

 
  useEffect(() => {
    setLoader(true);
    dispatch(fetchRoom(productId))
      .then((res) => {
        return setLoader(false);
      })
      .catch((err) => {
        return setLoader(false);
      });
  }, [productId]);

  useEffect(() => {
    if(auction)
    {setLoaderCarousel(true);
    axios
    .get(`/rooms/getAuctionsByCategory/${auction?.product?.category?._id}`)
    .then((res) => {
      setLoaderCarousel(false);
      let filteredArray = res?.data?.filter(
        (elm) => elm?._id !== auction?._id
      );
      setProducts(filteredArray);
      setLoaderCarousel(false);
  
    })
  }
  }, [auction]);

  /**************************************send click function******************************************** */
  const sendClick = () => {
    if (userInfo) {
      setDisable(true);
      if (price === 0) {
        socket.emit("firstClick", {
          room_id: auction._id,
          lastUserId: userInfo?._id,
          lastUserName: userInfo?.username,
        });
      }

      if (montant > 0) {
        socket.emit("clickButton", {
          timeOfClick: new Date(),
          userID: userInfo?._id,
          roomID: auction?._id,
          montant: montant,
        });
      }

      setTimeout(() => {
        setDisable(false);
        myRef.current.scrollIntoView({ block: "center" });
      }, 500);
    }
  };
  /***************************** Winner Modal function******************************************* */
  const finsold = () => {
    dispatch(setShowModalCredit());
  };
  /*****************************Buy Product function******************************************* */
  const buyProduct = () => {
    if (userInfo) {
      socket.emit("buyProduct", {
        triggerBuy: true,
        roomID: auction?._id,
        userID: userInfo?._id,
      });
    }
  };
  function handleChangeCarousel(carouselIndex) {
    setCarouselIndex(carouselIndex);
  }
  useEffect(() => {
    if (participationState) {
      if (participationState.ban === true) {
        setShowBan(true);
      }
    }
  }, [participationState]);
  useEffect(() => {
    return () => {
      dispatch(cleanRoom());
      dispatch(setFreeCredit(0));
    }
  }, []);
 
  return (
    <div>
      <main className="d-flex flex-column justify-content-center align-items-center ">
        <section className="container-fluid product-premium-large d-flex justify-content-center align-items-center m-0 px-sm-0">
          {loader ? (
            <Spinner
              animation="border"
              variant="light"
              className="mx-auto my-6"
            />
          ) : (
            <div className="p-0 w-100">
              <div className="w-100 d-flex flex-column flex-lg-row container-lg  p-lg-4 px-0">
                <div className="w-100 p-lg-5 position-relative carousel-wrapper">
                {  auction?.product?.brand? <img
                src={auction?.product?.brand?.logo?.imageURL}
                className="brand-product px-1"
                alt="..."
              />:null}
                  <Carousel className="slide position-unset" showStatus={false}>
                    <div>
                      <img
                        src={auction?.product?.image?.imageURL}
                        className="d-block w-100 px-1"
                        alt="..."
                      />
                    </div>
                    <div>
                      <img
                        src={auction?.product?.image1?.imageURL}
                        className="d-block w-100 px-1"
                        alt="..."
                      />
                    </div>
                    <div>
                      <img
                        src={auction?.product?.image2?.imageURL}
                        className="d-block w-100 px-1"
                        alt="..."
                      />
                    </div>
                  </Carousel>
                </div>

                <div className="w-100 d-flex flex-column justify-content-center product-card product-premium product-premium-large py-2 px-lg-5 mx-auto my-2 px-1">
                  <div>
                    <h1 className="mt-lg-5 px-1">{auction?.product?.title}</h1>
                  </div>
                  <div>
                    <h2>{auction?.product?.subTitle}</h2>
                  </div>
                  {auction?.status !== "enable" ? (
                      <div className="d-flex justify-content-center align-items-center flex-column">
                      <p
                        className={`mx-1 ${
                          description
                            ? "description-product-clicked"
                            : "description-product-premium"
                        }`}
                        ref={ref}
                      >
                        {auction?.product?.description}
                      </p>
                      {(height>25)? description ? (
                    <FontAwesomeIcon
                    className="float-animation icon-premium-hover"
                    icon={faChevronUp}
                    onClick={() => {
                      setDescription(!description);
                    }}
                    style={{ color: "rgb(255 255 255 / 50%)", cursor: "pointer",fontSize:"20px",maxHeight:"30px",padding:"5px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="float-animation icon-premium-hover"
                    icon={faChevronDown}
                    onClick={() => {
                      setDescription(!description);
                    }}
                    style={{ color: "rgb(255 255 255 / 50%)", cursor: "pointer",fontSize:"20px",maxHeight:"30px",padding:"5px" }}
                  />
                  ):null}
                    </div>
                  ) : null}

                  <div className="d-flex justify-content-between align-items-center px-2 py-1 w-100">
                    {!userInfo ? (
                      <div onClick={() => navigate("/")}>
                        {" "}
                        <i className="fi fi-rr-bookmark bookmark hover-icon"></i>{" "}
                      </div>
                    ) : userInfo?.bookmarks?.some(
                        (e) => e?._id === auction?._id
                      ) ? (
                      <div onClick={() => deleteBookmark(auction?._id)}>
                        {" "}
                        <i
                          className="fi fi-rr-bookmark bookmark hover-icon"
                          style={{ color: "#f9124e" }}
                        ></i>{" "}
                      </div>
                    ) : (
                      <div onClick={() => updateBookmark(auction._id)}>
                        {" "}
                        <i className="fi fi-rr-bookmark bookmark hover-icon"></i>{" "}
                      </div>
                    )}
                    {auction?.status === "enable" ? (
                      <button style={{ backgroundColor: "rgb(2, 202, 2)" }}>
                        <i className="icon-play mx-1"></i> Enchère en cours
                      </button>
                    ) : auction?.status === "pending" ? (
                      <button>
                        <i className="icon-time mx-1"></i>Enchère en attente
                      </button>
                    ) : auction?.status === "finished" ? (
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <i className="icon-flag-checkered mx-1"></i>Enchère terminée
                      </button>
                    ) : (
                      <button>Enchère déactivée</button>
                    )}
                  </div>
                  <div className="product-details-card product-details-card-premium my-3">
                    {/*********************COMPTEUR PC******************/}
                    {auction?.status === "enable" ? (
                  <div className="timer-wrapper">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="user-timer">
                        <span>
                          {" "}
                         {photo?<img className='mx-2 last-mise-photo' src={photo}/>:null}
                        </span>
                        <p>{userName}</p>
                      </div>
                      <div className="user-timer">
                        <span>
                          <i className="fi fi-rr-coins mx-2"></i>
                        </span>
                        <p>{price} DT</p>
                      </div>
                  
                    </div>
                    <div className="btn w-100 counter-btn" ref={myRef}>
                      <span className="timer-unit">
                        {" "}
                        {convertSecondstoTime(timer).substring(0, 2)}
                      </span>
                      <span className="timer-unit">:</span>
                      <span className="timer-unit">
                        {convertSecondstoTime(timer).substring(3, 5)}
                      </span>
                    </div>
                  </div>
                ) : null}

                    {auction?.status === "enable" &&
                    participationState &&
                    auction?.directWinner?._id !== userInfo?._id ? (
                      <div>
                        {" "}
                        {montant - auction.mise < 0 ? (
                          <button
                            className="btn mise-btn w-100 edge-shadow-button"
                            onClick={finsold}
                          >
                            Recharger Votre Compte
                          </button>
                        ) : (
                          <div className="btn mise-btn w-100 mb-lg-2 p-0  d-flex justify-content-between align-items-center edge-shadow-button">
                            <button
                              onClick={sendClick}
                              disabled={montant - auction?.mise < 0 || disable}
                             
                            >
                              {" "}
                              {disable && (
                                <div
                                  className="spinner-border text-light mise-spinner"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              )}{" "}
                              {price === 0 && montant - auction.mise >= 0
                                ? `Première Mise +${auction.mise} DT`
                                : `Miser +${auction.mise} DT`}
                            </button>
                            {freeCredit? <button
                          className="credit-mise color-green"
                          onClick={() => dispatch(setShowModalCredit())}
                          
                        >
                          {" "}
                          <var>
                            {freeCredit.toFixed(1)}
                            <sup>
                              {" "}
                              <i className="fi fi-rr-gift"></i>
                            </sup>
                          </var>
                         
                        </button>:<button
                          className="credit-mise bg-pink"
                          onClick={() => dispatch(setShowModalCredit())}
                        >
                          {" "}
                          <var>
                            {montant === null
                              ? userInfo?.credit?.montant?.toFixed(1)
                              : montant?.toFixed(1)}
                            <sup>
                              {" "}
                              <i className="fi fi-rr-coins"></i>
                            </sup>
                          </var>
                         
                        </button>}
                          </div>
                        )}
                      </div>
                    ) : null}
                    {showDirectPurchase &&
                      participationState &&
                      !auction?.directWinner && (
                        <button
                          className="btn btn-gold w-100 mt-3"
                          onClick={() => buyProduct()}
                        >
                          Acheter directement
                        </button>
                      )}

                    <div className="product-table w-100">
                      <div className="row m-0">
                        <div className="d-flex col-6">
                          <i className="fi fi-rr-tags"></i>
                          <p>Prix Original</p>
                        </div>
                        <div className="col-6 text-end d-flex align-items-center justify-content-end prix-premium">
                          {auction?.product?.prix} DT
                        </div>
                      </div>
                      {auction?.product?.partner ? (
                        <div className="row m-0">
                          <div className="d-flex col-6">
                            <i className="fi fi-rr-users"></i>
                            <p>Partenaire</p>
                          </div>
                          <div className="col-6 text-end d-flex align-items-center justify-content-end">
                            <img
                              src={auction?.product?.partner?.image?.imageURL}
                            />
                          </div>
                        </div>
                      ) : null}
                      <div className="row m-0">
                        <div className="d-flex col-6">
                          <i className="fi fi-rr-calendar"></i>
                          <p>Date début</p>
                        </div>
                        <p className="col-6 text-end d-flex align-items-center justify-content-end">
                          {format(
                            new Date(auction ? auction.startDate : null),
                            "dd/MM/yyyy  à  HH:mm"
                          )}
                        </p>
                      </div>
                      <div className="row m-0">
                        <div className="d-flex col-6">
                          <i className="fi fi-rr-users-alt"></i>
                          <p>Participation</p>
                        </div>
                        <div className="col-6 position-relative">
                          <div className="circle-wrap">
                            <div className="circle">
                              <div className="mask full">
                                <div className="fill"></div>
                              </div>
                              <div className="mask half">
                                <div className="fill"></div>
                              </div>
                              <div className="inside-circle">
                                {" "}
                                {Math.floor((participationNumber/auction?.capacity)*100)}%{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {auction?.product?.garantie?<div className="row m-0 col-6">
                    <div className="d-flex col-6">
                      <div className="sprite sprite-icon-badge-garantie-red"></div>
                      <p>Garantie</p>
                    </div>
                    <p className="col-6 text-end d-flex align-items-center justify-content-end">
                      {auction?.product?.garantie} Mois
                    </p>
                  </div>:null}
                  <div className="row m-0 col-6">
                      <div className="d-flex col-6">
                        <i className="fi fi-rr-gift"/>
                        <p>Bonus</p>
                      </div>
                      <p className="col-6 text-end d-flex align-items-center justify-content-end">
                        50 DT
                      </p>
                    </div>
                      <div className="row m-0 border-bottom-0">
                        <div className="d-flex col-6">
                          <div className="sprite sprite-icon-badge-garantie-reduced-red"></div>
                          <p>Type</p>
                        </div>
                        <div className="col-6 text-end d-flex align-items-center justify-content-end">
                          {auction?.niveau === "gold" ? (
                            <img src={gold} />
                          ) : auction?.niveau === "silver" ? (
                            <img src={silver} />
                          ) : (
                            <img src={copper} />
                          )}
                        </div>
                      </div>

                      {Math.floor((participationNumber/auction?.capacity)*100) >= 100 &&
                      auction?.status === "pending" ? (
                        <div className="remplie-section">
                          <div className="remplie d-flex flex-column justify-content-center align-items-center">
                            <p className="premium-remplie">
                              Enchère remplie à <span>100%</span>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {auction?.status === "pending" ? (
                        <div className="row mx-0 border-bottom-0">
                          <div className="col-md-12 mobile-fixed-btn d-flex justify-content-center align-items-center">
                            {!participationLoader &&
                            participationState &&
                            days >= 0 &&
                            hours >= 0 &&
                            minutes >= 0 &&
                            seconds >= 0 ? (
                              <span className="btn btn-product bg-pink countdown-btn">
                                <ShowCounter
                                  days={days}
                                  hours={hours}
                                  minutes={minutes}
                                  seconds={seconds}
                                />
                              </span>
                            ) : participationLoader ? (
                              <div
                                className="spinner-border mx-auto "
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : null}
                            {/*(credit_user<1)&&<div className="alert alert-danger text-center" role="alert">
                                         veuillez recharger votre credit
                                        </div>*/}
                          </div>
                        </div>
                      ) : null}
                      {/*************************CASE 1: ROOM FINISHED ******************************/}
                      {auction?.status === "finished" ? (
                        <div>
                          {auction?.winner?._id === userInfo?._id ? (
                            <div className="winner-section">
                              <div className="winner d-flex flex-column justify-content-center align-items-center">
                                <img
                                  src={auction?.winner?.profile_img?.imageURL}
                                />
                                <p>
                                Vous avez remporté cette enchère au prix de{" "}
                                  <span className="winner-price">
                                    {auction?.prixPromo?.toFixed(1)} DT
                                  </span>
                                </p>
                              </div>
                            </div>
                          ) : (
                            auction?.winner && (
                              <div className="winner-section">
                                <div className="winner d-flex flex-column justify-content-center align-items-center">
                                  <img
                                    src={auction?.winner?.profile_img?.imageURL}
                                  />

                                  <p>
                                    Remportée par {auction?.winner?.username} à{" "}
                                    <span className="winner-price">
                                      {auction?.prixPromo?.toFixed(1)} DT
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : null}
                      {auction?.status === "finished" ||
                      auction?.status === "enable" ? (
                        <div>
                          {auction?.directWinner?._id === userInfo?._id &&
                          userInfo ? (
                            <div className="winner-section">
                              <div className="winner d-flex flex-column justify-content-center align-items-center">
                                <img
                                  src={
                                    auction?.directWinner?.profile_img?.imageURL
                                  }
                                />
                                <p>
                                  Vous avez acheté ce produit à{" "}
                                  <span className="winner-price">
                                    {auction?.directPrice?.toFixed(1)} DT
                                  </span>
                                </p>
                              </div>
                            </div>
                          ) : (
                            auction?.directWinner && (
                              <div className="winner-section">
                                <div className="winner d-flex flex-column justify-content-center align-items-center">
                                  <img
                                    src={
                                      auction?.directWinner?.profile_img
                                        ?.imageURL
                                    }
                                  />

                                  <p>
                                    {auction?.directWinner?.username} a acheté
                                    le produit à{" "}
                                    <span className="winner-price">
                                      {auction?.directPrice?.toFixed(1)} DT
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {auction?.status === "pending" ? (
                    <div>
                      {isAuth ? (
                        <div>
                          {" "}
                          {!participationLoader &&
                          !participationState &&
                          Math.floor((participationNumber/auction?.capacity)*100) < 100 ? (
                            <div className="d-flex align-items-center justify-content-center w-100 ">
                              <button
                                className="participation-button"
                                onClick={handleShow}
                              >
                                Participer à{" "}
                                <b>{auction?.participationPrice}</b> DT
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ) : Math.floor((participationNumber/auction?.capacity)*100) < 100 ? (
                        <Link
                          className="w-100 d-flex align-items-center justify-content-center"
                          to="/signin"
                        >
                          <button className="participation-button">
                            Participer à <b>{auction?.participationPrice}</b> DT
                          </button>
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </section>
        {(auction?.status !== "enable") && (products?.length>0) ? (
          <section className="w-100 product-page-section p-lg-4 p-md-2 p-sm-0 d-flex justify-content-center align-items-center flex-column mb-4">
            <h2>Augmentez vos chances de gagner</h2>
            {loaderCarousel ? (
              <Spinner animation="border" className="mx-auto color-pink my-5" />
            ) : (
              <div className="container" ref={refCarousel}>
               <CarouselMulti
                              swipeable={true}
                              slidesToSlide={1}
                              autoPlay={false}
                              ssr={false}
                              draggable={true}
                              showDots={false}
                              responsive={responsive}
                              infinite={false}
                              deviceType={props.deviceType}
                              customRightArrow={<CustomRightArrow />}
                              customLeftArrow={<CustomLeftArrow />}
                              renderDotsOutside={false}
                              shouldResetAutoplay={false}
                             
                            >
                              {products
                                ? products.map((elm) => (
                                 
                                      <Card variant="home" key={elm._id} product={elm}/>
                                  
                                  ))
                                : null}
                            </CarouselMulti>
              </div>
            )}
          </section>
        ) : null}
      </main>

      <Footer />
      <ParticipationModal
        room={auction}
        show={show}
        onHide={() => setShow(false)}
      />
      <WinnerModal
        show={showWinner}
        winner={iswinner}
        loser={isloser}
        room={auction}
        user={userInfo?._id}
        onHide={() => {
          setShowWinner(false);
          setTimer(600);
        }}
        winnerCallback={() => setShowWinner(false)}
      />
      <PurchaseModal
        show={showPurchaseModal}
        counter={price}
        onHide={HidePurchase}
        parentCallback={callbackPurchase}
        hidCallback={callbackHide}
      />
      <ConnectionAlert
        room={auction}
        user={userInfo}
        socket={socket}
        parentCallback={callback}
        show={showAlert}
      />
       <FreeCreditModal
        show={modalFreeCredit}
       onHide={()=>setModalFreeCredit(false)}
       freeCreditCallback={() => setModalFreeCredit(false)}
       
      />
      <SortirModal show={showMise} />
      <BanModal show={showBan} />
    </div>
  );
};

export default PremiumProduct;
