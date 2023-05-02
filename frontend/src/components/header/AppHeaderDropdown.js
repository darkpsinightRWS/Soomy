import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { logout } from "../../redux/userSlice";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AppHeaderDropdown = () => {
  const user = useSelector((state) => state.user);
  const { isAuth, userInfo } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userInfo?.profile_img?.imageURL} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem onClick={() => navigate("/profile")}>
                  Profile
                </CDropdownItem>
               {userInfo?.isAdmin? <CDropdownItem onClick={() => navigate("/dashboard")}>
                  Tableau de bord
                </CDropdownItem>:null}
                <CDropdownDivider />
                <CDropdownItem
                  className="dropdown-links"
                  onClick={() => {
                    dispatch(logout()).then((res) => {
                      if (res.payload.status === 200) {
                        return navigate("/");
                      }
                    });
                  }}
                >
                  Déconnexion
                </CDropdownItem>
  </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
