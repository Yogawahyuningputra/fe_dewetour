import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Logout from "../assest/images/logout.png";
import Iconuser from "../assest/images/usertogle.png";
import Bill from "../assest/images/bill.png";
import Profile from "../assest/images/profile.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const MenuUsers = ({ logout }) => {
    const [state] = useContext(UserContext)
    const navigate = useNavigate()
    return (
        <OverlayTrigger trigger="click" placement="bottom" className="mt-1 py-1" overlay={

            <Popover id="popover-basic" style={{ width: "auto", height: "auto", fontWeight: "bold" }}>

                <Popover.Body className="mt-1 mb-1 py-1" onClick={() => navigate(`/profile`)}>
                    <img src={Iconuser} alt="" style={{ width: "30px", height: "30px", marginRight: "30px" }} />Profile
                </Popover.Body>
                <Popover.Body className="mt-1 mb-1 py-1" onClick={() => navigate("/payment")}>
                    <img src={Bill} alt="" style={{ width: "30px", height: "30px", marginRight: "30px" }} />Pay
                </Popover.Body>
                <hr className="mt-1 mb-1 py-1" />
                <Popover.Body className="mt-1 mb-1 py-1" onClick={logout}>
                    <Nav.Link ><img src={Logout} alt="" style={{ width: "30px", height: "30px", marginRight: "30px" }} />Logout</Nav.Link>
                </Popover.Body>
            </Popover>
        }>
            <img src={state.user.image} alt="" style={{ width: "50px", height: "50px" }} className="rounded-circle" />
        </OverlayTrigger>

    );
}
export default MenuUsers;