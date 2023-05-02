import { useState, useEffect } from "react";
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
import {
  cilPenAlt,
  cilTrash,
  cilStar,
  cilGamepad,
  cilWallet,
} from "@coreui/icons";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import CIcon from "@coreui/icons-react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import routes from "../../../routes";
import { fetchTransactionList } from "../../../redux/transactionSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);
  const { transactionList } = transaction;
  useEffect(() => {
    const loadData = async () => {
      dispatch(fetchTransactionList({ page: 1 }));
    };
    loadData();
  }, [dispatch]);
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
          
            <CTableHeaderCell>Référence</CTableHeaderCell>
            <CTableHeaderCell>Utilisateur</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Service</CTableHeaderCell>
            <CTableHeaderCell>Montant</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {transactionList?.transactions?.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item?.ref}</div>
              </CTableDataCell>

              <CTableDataCell>
                <div>{item?.user.username}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.type}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.service}</div>
              </CTableDataCell>

              <CTableDataCell>
                <div>{item?.montant} dt</div>
              </CTableDataCell>

              <CTableDataCell>
                <div>{format(new Date(item.createdAt), "dd/MM/yyy")}</div>
              </CTableDataCell>

            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Pagination>
        <Pagination.First
          onClick={() => {
            dispatch( fetchTransactionList({  page: 1 }));
          }}
        />

        <Pagination.Prev
          onClick={() => {
            dispatch(
            fetchTransactionList({
                
                page:
                  transactionList?.page === 1
                    ? transactionList?.totalPages
                    : transactionList?.page - 1,
              })
            );
          }}
        />
        <Pagination.Item
          onClick={() => {
            dispatch( fetchTransactionList({  page: 1 }));
          }}
          active={transactionList?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {transactionList?.totalPages > 5 &&
          transactionList?.page > 3 && <Pagination.Ellipsis />}
        {transactionList?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              dispatch( fetchTransactionList({  page: 2 }));
            }}
            active={transactionList?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {transactionList?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (transactionList?.page ===
                transactionList?.totalPages - 2
                  ? transactionList?.page - 2
                  : transactionList?.page ===
                    transactionList?.totalPages - 1
                  ? transactionList?.page - 3
                  : transactionList?.page ===
                    transactionList?.totalPages
                  ? transactionList?.page - 4
                  : transactionList?.page === 1
                  ? transactionList?.page
                  : transactionList?.page === 2 ||
                    transactionList?.page === 3
                  ? 1
                  : transactionList?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  fetchTransactionList({  page: elm + 1 })
                  );
                }}
                active={transactionList?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {transactionList?.totalPages === 4 &&
          [...Array(2).keys()]
            .map(
              (i) =>
                i + 1
               
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  fetchTransactionList({  page: elm + 1 })
                  );
                }}
                active={transactionList?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {transactionList?.totalPages > 5 &&
          transactionList?.totalPages - 2 > transactionList?.page && (
            <Pagination.Ellipsis />
          )}
        {
          (transactionList?.totalPages > 1 && (
            <Pagination.Item
              onClick={() => {
                dispatch(
                  fetchTransactionList({
                    
                    page: transactionList?.totalPages,
                  })
                );
              }}
              active={
                transactionList?.totalPages === transactionList?.page
                  ? true
                  : false
              }
            >
              {transactionList?.totalPages}
            </Pagination.Item>
          ))}
        <Pagination.Next
          onClick={() => {
            dispatch(
            fetchTransactionList({
                
                page:
                  transactionList.page === transactionList?.totalPages
                    ? 1
                    : transactionList?.page + 1,
              })
            );
          }}
        />
        <Pagination.Last
          onClick={() => {
            dispatch(
            fetchTransactionList({
               
                page: transactionList?.totalPages,
              })
            );
          }}
        />
      </Pagination>
     
   
    </>
  );
};
export default Transactions;
