import { useState, useEffect } from "react";
import {
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CBadge,
  CAvatar,
} from "@coreui/react";
import { cilTrash, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
const Users = () => {
  const [users, setUsers] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`/users/getUsers/1`)
      .then((res) => {
        setLoader(false);
        setUsers(res.data);
      })
      
  }, []);

  const deleteUser = (id) => {
    setLoader(true);
    axios
      .delete(`/users/deleteUser/${id}`)
      .then(() => axios.get(`/users/getUsers/${users?.page}`))
      .then((res) => {
        setLoader(false);
        setUsers(res.data);
      })
     
  };
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nom & Prénom</CTableHeaderCell>
            <CTableHeaderCell>Nom d'utilisateur</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Télephone
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Solde</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users?.users?.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar size="md" src={item?.profile_img?.imageURL} />
              </CTableDataCell>
              <CTableDataCell>
                <div>
                  {item?.firstName} {item?.lastName?.toUpperCase()}
                </div>
                <div className="small text-medium-emphasis">
                  <span>{item?.approved ? "Verifié" : "Non Verifié"}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.username}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {item?.email}
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {item?.phone ? item?.phone : "-"}
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CBadge color="success">{item?.credit?.montant}</CBadge>
              </CTableDataCell>

              <CTableDataCell>
                <CIcon
                  className="mx-2"
                  icon={cilTrash}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    ) {
                      deleteUser(item?._id);
                    }
                  }}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Pagination>
        <Pagination.First
          onClick={() => {
            axios
              .get(`/users/getUsers/1`)
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              })
             
          }}
        />

        <Pagination.Prev
          onClick={() => {
            axios
              .get(
                `/users/getUsers/${
                  users?.page === 1 ? users?.totalPages : users?.page - 1
                }`
              )
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              })
              
          }}
        />
        <Pagination.Item
          onClick={() => {
            axios
              .get(`/users/getUsers/1`)
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              })
              
          }}
          active={users?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {users?.totalPages > 5 && users?.page > 3 && <Pagination.Ellipsis />}
        {users?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              axios
                .get(`/users/getUsers/2`)
                .then((res) => {
                  setLoader(false);
                  setUsers(res.data);
                })
                
            }}
            active={users?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {users?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (users?.page === users?.totalPages - 2
                  ? users?.page - 2
                  : users?.page === users?.totalPages - 1
                  ? users?.page - 3
                  : users?.page === users?.totalPages
                  ? users?.page - 4
                  : users?.page === 1
                  ? users?.page
                  : users?.page === 2 || users?.page === 3
                  ? 1
                  : users?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  axios
                    .get(`/users/getUsers/${elm + 1}`)
                    .then((res) => {
                      setLoader(false);
                      setUsers(res.data);
                    })
                  
                }}
                active={users?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {users?.totalPages === 4 &&
          [...Array(2).keys()]
            .map((i) => i + 1)
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  axios
                    .get(`/users/getUsers/${elm + 1}`)
                    .then((res) => {
                      setLoader(false);
                      setUsers(res.data);
                    })
                    
                }}
                active={users?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {users?.totalPages > 5 && users?.totalPages - 2 > users?.page && (
          <Pagination.Ellipsis />
        )}
        {users?.totalPages > 1 && (
          <Pagination.Item
            onClick={() => {
              axios
                .get(`/users/getUsers/${users?.totalPages}`)
                .then((res) => {
                  setLoader(false);
                  setUsers(res.data);
                })
               
            }}
            active={users?.totalPages === users?.page ? true : false}
          >
            {users?.totalPages}
          </Pagination.Item>
        )}
        <Pagination.Next
          onClick={() => {
            axios
              .get(
                `/users/getUsers/${
                  users.page === users?.totalPages ? 1 : users?.page + 1
                }`
              )
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              })
              
          }}
        />
        <Pagination.Last
          onClick={() => {
            axios
              .get(`/users/getUsers/${users?.totalPages}`)
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              })
              
          }}
        />
      </Pagination>
    </>
  );
};
export default Users;
