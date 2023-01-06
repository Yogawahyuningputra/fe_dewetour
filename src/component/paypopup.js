import React from "react"
import Modal from "react-bootstrap/Modal"
import { useNavigate, useParams } from "react-router-dom"

function ModalPopUp({ show, onHide }) {
    const navigate = useNavigate()
    // const { id } = useParams()
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 className="text-center m-0 p-5">
                    Your payment will be confirmed within 1 x 24 hours
                    To see orders click <a href onClick={() => navigate(`/waitingpayment`)} style={{ textDecoration: "none" }} className="text-success fs-5">Here</a> thank you
                </h4>
            </Modal.Body>
        </Modal >
    )
}

export default ModalPopUp