import React from 'react'
// import { useNavigate } from 'react-router-dom'
import Notfound from '../assest/images/emoji.svg'
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound({ show, onHide }) {
    const navigate = useNavigate()

    return (
        <>
            <p className="d-flex justify-content-center w-100 mt-5">
                <img src={Notfound} alt="brand" className="d-flex justify-content-center w-25"></img>

            </p>
            <p className="fs-4 mb-5"><Badge bg="warning" onClick={() => navigate("/")}>Please Back To DashBoard</Badge></p>

        </>
    )
}

export default NotFound;