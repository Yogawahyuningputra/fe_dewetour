import React from "react";
// import Nav from "react-bootstrap/Nav";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Logout from "../assest/images/logout.png";
import Trip from "../assest/images/trip.png";
import Profile from "../assest/images/profile.png";
import { useNavigate } from "react-router-dom";




const MenuAdmin = ({ logout }) => {
    const navigate = useNavigate()


    return (
        <OverlayTrigger delay={{ show: 250, hide: 2500 }} placement="bottom" className="mt-1 py-1" overlay={

            <Popover id="popover-basic" style={{ width: "auto", height: "auto", fontWeight: "bold", cursor: 'pointer' }}>


                <Popover.Body className="mt-1 mb-1 py-1" onClick={() => navigate("/admin/incometrip")}>
                    <img src={Trip} alt="" style={{ width: "30px", height: "30px", marginRight: "30px", cursor: 'pointer' }} />Trip
                </Popover.Body>
                <hr className="mt-1 mb-1 py-1" />
                <Popover.Body className="mt-1 mb-1 py-1" onClick={logout}>
                    <img src={Logout} alt="" style={{ width: "30px", height: "30px", marginRight: "30px", cursor: 'pointer' }} />Logout
                </Popover.Body>
            </Popover>
        }>
            <img src={Profile} alt="prifile" style={{ width: "50px", height: "50px", cursor: 'pointer' }} />
        </OverlayTrigger>

    );
}
export default MenuAdmin;