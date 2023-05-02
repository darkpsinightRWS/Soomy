import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import {
    CTableHead,
    CTableBody,
    CTable,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CProgress,
    CAvatar,
    CBadge,
    CFormSelect,
    CBreadcrumbItem,
    CBreadcrumb,
    CContainer,
    CHeader,
  } from "@coreui/react";
  import { useLocation } from "react-router-dom";
  import routes from "../../../routes";
  import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
  import CIcon from "@coreui/icons-react";
  import {
    cilPenAlt,
    cilTrash,
    cilStar,
    cilGamepad,
    cilWallet,
  } from "@coreui/icons";
import Pagination from "react-bootstrap/Pagination";
import {
  clearOrderErrors,
  deleteOrder,
  editOrder,
  fetchOrderList,
  updateOrder,
} from "../../../redux/orderSlice";

const ListTransactions = () => {
  const [OrderInputEdit, setOrderInputEdit] = useState({});
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const {
    orderList,
    updateOrderErrors,
    OrderEditSuccess,
    editedOrder,
    loadingUpdateOrder,
  } = order;
  useEffect(() => {
    dispatch(fetchOrderList({page:1}));
  }, [dispatch]);
  const handleChangeEdit = (e) => {
    setOrderInputEdit({ ...OrderInputEdit, [e.target.name]: e.target.value });
  };
  const handleSubmitEdit = () => {
    dispatch(clearOrderErrors());
    dispatch(updateOrder({ id: editedOrder._id, data: OrderInputEdit })).then(()=>dispatch(fetchOrderList({page:orderList?.page})));
  };
  const clearStateEdit = () => {
    setModalShowEdit(false);
    setOrderInputEdit({
      product: "",
      StartDate: "",
      nbParticipant: "",
      capacity: "",
      mise: "",
      participationPrice: "",
      roomCategory: "",
      niveau: "",
    });

    dispatch(clearOrderErrors());
  };
  const currentLocation = useLocation().pathname;
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };
  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);
  return (
    <>
  <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CBreadcrumb className="m-0 ms-2">
            <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
            {breadcrumbs.map((breadcrumb, index) => {
              return (
                <CBreadcrumbItem
                  {...(breadcrumb.active
                    ? { active: true }
                    : { href: breadcrumb.pathname })}
                  key={index}
                >
                  {breadcrumb.name}
                </CBreadcrumbItem>
              );
            })}
          </CBreadcrumb>
        
        </CContainer>
      </CHeader>

               
      <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
      <CTableRow>
                          <CTableHeaderCell>Reférence</CTableHeaderCell>
                          <CTableHeaderCell>Date</CTableHeaderCell>
                          <CTableHeaderCell>Produit</CTableHeaderCell>
                          <CTableHeaderCell>Statut de livraison</CTableHeaderCell>
                          <CTableHeaderCell>Statut de paiement</CTableHeaderCell>
                          <CTableHeaderCell>Montant</CTableHeaderCell>
                          <CTableHeaderCell>Expiration Date</CTableHeaderCell>
                          <CTableHeaderCell>Action</CTableHeaderCell>
                          </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {orderList?.orders?.map((elm,index) => (
                             <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                              <p>{elm?.ref_order}</p>
                            </CTableDataCell>
                            <CTableDataCell>
                              <p>{format(new Date(elm.date), "dd/MM/yyyy,HH:mm")}</p>
                            </CTableDataCell>
                            <CTableDataCell>
                              <p>{elm?.room_id?.product?.title}</p>
                            </CTableDataCell>
                            <CTableDataCell>
                              <span
                                className={`status-text ${
                                  elm?.status_delivery === "livré"
                                    ? "status-green"
                                    : "status-orange"
                                }`}
                              >
                                {elm?.status_delivery}
                              </span>
                            </CTableDataCell>
                            <CTableDataCell className="status">
                              {elm?.status_payment==="payé" ? (
                                <span className="status-text status-green">
                                  Payé
                                </span>
                              ) : (
                                <span className="status-text status-orange">
                                 {elm?.status_payment}
                                </span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell>
                              {elm?.typeWinner==="soomy" ? (
                                <p>{elm?.room_id?.prixPromo} dt</p>
                              ) : elm?.typeWinner==="premium" ? (
                                <p>{elm?.room_id?.directPrice} dt</p>
                              ): (
                                "---"
                              )}
                            </CTableDataCell>
                            <CTableDataCell>
                            {elm?.expiration?format(new Date(elm?.expiration), "P,HH:mm"):null}
                            </CTableDataCell>
                            <CTableDataCell>
                <CIcon
                  className="mx-2"
                  onClick={() =>{ {dispatch(editOrder(elm))
                    setModalShowEdit(true)}}}
                  icon={cilPenAlt}
                />
                <CIcon className="mx-2" icon={cilTrash} onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you wish to delete this item?"
                                    )
                                  )
                                    dispatch(deleteOrder(elm._id)).then(() => {
                                      dispatch(fetchOrderList({page:orderList?.page}));
                                    });
                                }} />
              </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                    <Pagination>
          <Pagination.First
            onClick={() => {
              dispatch(fetchOrderList({  page: 1 }));
            }}
          />
  
          <Pagination.Prev
            onClick={() => {
              dispatch(
              fetchOrderList({
                  
                  page:
                    orderList?.page === 1
                      ? orderList?.totalPages
                      : orderList?.page - 1,
                })
              );
            }}
          />
          <Pagination.Item
            onClick={() => {
              dispatch(fetchOrderList({  page: 1 }));
            }}
            active={orderList?.page === 1 ? true : false}
          >
            {1}
          </Pagination.Item>
          {orderList?.totalPages > 5 &&
            orderList?.page > 3 && <Pagination.Ellipsis />}
          {orderList?.totalPages === 3 && (
            <Pagination.Item
              onClick={() => {
                dispatch(fetchOrderList({  page: 2 }));
              }}
              active={orderList?.page === 2 ? true : false}
            >
              {2}
            </Pagination.Item>
          )}
          {orderList?.totalPages > 4 &&
            [...Array(3).keys()]
              .map(
                (i) =>
                  i +
                  (orderList?.page ===
                  orderList?.totalPages - 2
                    ? orderList?.page - 2
                    : orderList?.page ===
                      orderList?.totalPages - 1
                    ? orderList?.page - 3
                    : orderList?.page ===
                      orderList?.totalPages
                    ? orderList?.page - 4
                    : orderList?.page === 1
                    ? orderList?.page
                    : orderList?.page === 2 ||
                      orderList?.page === 3
                    ? 1
                    : orderList?.page - 2)
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(
                    fetchOrderList({  page: elm + 1 })
                    );
                  }}
                  active={orderList?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {orderList?.totalPages === 4 &&
            [...Array(2).keys()]
              .map(
                (i) =>
                  i + 1
                 
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(
                    fetchOrderList({  page: elm + 1 })
                    );
                  }}
                  active={orderList?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {orderList?.totalPages > 5 &&
            orderList?.totalPages - 2 > orderList?.page && (
              <Pagination.Ellipsis />
            )}
          {
            (orderList?.totalPages > 1 && (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  fetchOrderList({
                      
                      page: orderList?.totalPages,
                    })
                  );
                }}
                active={
                  orderList?.totalPages === orderList?.page
                    ? true
                    : false
                }
              >
                {orderList?.totalPages}
              </Pagination.Item>
            ))}
          <Pagination.Next
            onClick={() => {
              dispatch(
              fetchOrderList({
                  
                  page:
                    orderList.page === orderList?.totalPages
                      ? 1
                      : orderList?.page + 1,
                })
              );
            }}
          />
          <Pagination.Last
            onClick={() => {
              dispatch(
              fetchOrderList({
                 
                  page: orderList?.totalPages,
                })
              );
            }}
          />
        </Pagination>
                  
               
              {/****************************************Edit Modal*************************************************************** */}
              <Modal show={modalShowEdit} onHide={clearStateEdit}>
                <Modal.Header>
                  <h5 className="modal-title" id="exampleModalLabel">
                   Edit Details de La Commande
                  </h5>
                </Modal.Header>
                <Modal.Body className="m-3 p-3">
                <div className="mb-3 d-flex">
                <div className="d-flex flex-column justify-content-left w-50 pe-1">
                <label for="exampleFormControlInput1" className="modal-label text-start">
                      {" "}
                    Etat de Livraison{" "}
                    </label>
                <select
                    className="form-control me-1"
                    id="exampleFormControlInput1"
                    name="status_delivery"
                    value={OrderInputEdit.status_delivery}
                    onChange={(e) => handleChangeEdit(e)}
                  >
                   <option disabled>Choisir ...</option>
                    <option value="-">-</option>
                    <option value="en attente de livraison">En attente de livraison</option>
                    <option value="livraison en cours">Livraison en cours</option>
                    <option value="livraison terminé">Livraison terminé</option>
                 
                   
                  </select>
                  </div>
                  <div className="d-flex flex-column justify-content-left w-50 ps-1">
                  <label
                      for="exampleFormControlInput1"
                      className="modal-label text-start ps-2"
                    >Etat de paiement</label>
                  <select
                    className="form-control "
                    id="exampleFormControlInput1"
                    name="status_payment"
                    value={OrderInputEdit.status_payment}
                    onChange={(e) => handleChangeEdit(e)}
                  >
                    <option disabled>Choisir ...</option>
                    <option value="en attente de virement">en attente de virement</option>
                    <option value="en attente">en attente</option>
                    <option value="payé">payé</option>
                    
                  </select>
                  </div>
                </div>
                <div className="mb-3">
                <label for="exampleFormControlInput1" className="modal-label text-start">
                      {" "}
                      Date Expiration{" "}
                    </label>
                  <input
                    type="datetime-local"
                    className="form-control  "
                    id="exampleFormControlInput1"
                    placeholder={new Date(OrderInputEdit.expiration)}
                    name="expiration"
                    value={OrderInputEdit.expiration}
                    onChange={(e) => handleChangeEdit(e)}
                    
                  />
                  </div>

                  {loadingUpdateOrder && (
                    <div className="w-100 mt-2 d-flex justify-content-center">
                      <div className="spinner-border mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {updateOrderErrors && (
                    <div className="alert alert-danger" role="alert">
                      {updateOrderErrors}
                    </div>
                  )}
                  {OrderEditSuccess && (
                    <div className="alert alert-success" role="alert">
                      Enchère Mis a jour !
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearStateEdit}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitEdit}
                  >
                    Save changes
                  </button>
                </Modal.Footer>
              </Modal>
              {/****************************************End Edit Modal*************************************************************** */}
            
    </>
  );
};

export default ListTransactions;