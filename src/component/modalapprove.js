import React, { useState } from 'react'
import { Container, Stack, Col, Card, Table, Button, Badge, Modal } from 'react-bootstrap'
import logo from '../assest/images/logo2.png'
import invoice from '../assest/images/invoice.png'
import { API } from '../config/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

function ModalApprove(props) {
    const { show, onHide, selectedData, onApprove, onCancel } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            await API.patch(`/approve/${selectedData.id}`);
            onHide();
            onApprove()

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async () => {
        setIsLoading(true);
        try {
            await API.patch(`/cancel/${selectedData.id}`);
            onHide();
            onCancel()
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        < Modal
            show={show} onHide={onHide}
            size="xl"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container className="w-100 mt-2">
                {/* {Approve?.map((data, idx) => ( */}
                <Stack direction="vertical" gap={3} style={{ backgroundColor: "white", padding: "20px" }} className="d-flex justify content-center mt-2 rounded-3">

                    <Stack direction="horizontal" gap={3}>

                        <Col sm={9} className="d-flex justify-content-start mt-0">
                            <img src={logo} alt="images"></img>
                        </Col>
                        <Col sm={3} className="fw-bold">
                            <Card.Text className="fw-bold mt-0">BOOKING</Card.Text>
                            <Card.Text className="text-secondary">{selectedData?.trip?.date_trip}</Card.Text>
                        </Col>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="mt-0">
                        <Col sm={5} className="text-start">
                            <Card.Text className="fw-bold mb-1">{selectedData?.trip?.title}</Card.Text>
                            <Card.Text className="text-secondary">{selectedData?.trip?.country?.name}</Card.Text>
                            <Card.Text className="text-secondary"><Badge bg="danger">{selectedData?.status} </Badge></Card.Text>

                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Date Trip</Card.Text>
                                <Card.Text className="text-secondary">{selectedData?.trip?.date_trip}</Card.Text>
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Acomodations</Card.Text>
                                <Card.Text className="text-secondary">{selectedData?.trip?.acomodation}</Card.Text>
                            </Col>
                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Durations</Card.Text>
                                <Card.Text className="text-secondary">{selectedData?.trip?.day} Day {selectedData?.trip?.night} Night</Card.Text>
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Transportations</Card.Text>
                                <Card.Text className="text-secondary">{selectedData?.trip?.transportation}</Card.Text>
                            </Col>
                        </Col>
                        <Stack direction="vertical" className=" ms-auto mt-3">
                            <img src={invoice} alt="images" style={{ width: "140px", marginLeft: "15px" }}></img>
                            <Card.Text className="text-secondary">upload payment proof</Card.Text>
                        </Stack>

                    </Stack>
                    <Table >
                        <thead>
                            <tr>

                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th colSpan={3}></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >

                                <td>{selectedData?.user?.fullname}</td>
                                <td>{selectedData?.user?.gender}</td>
                                <td>{selectedData?.user?.phone}</td>
                                <td>{selectedData?.user?.address}</td>
                                <td className='fw-bold'>Qty</td>
                                <td colSpan={3} className="text-start fw-bold">: {selectedData?.qty}</td>



                            </tr>
                            <tr>
                                <td colSpan={4}></td>
                                <td className='fw-bold'>Total</td>
                                <td colSpan={3} className="text-start text-danger fw-bold">: {selectedData?.total}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Stack >
                {/* ))} */}
                {selectedData?.status === "Approve" ? (

                    <div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-end mb-3 mx-4">
                        <Button variant="danger" style={{ width: "20vh", height: "5vh", color: "white", fontWeight: "bold", fontSize: "14px", marginRight: "10px" }} onClick={handleCancel} disabled={isLoading}>CANCEL </Button>
                        <Button variant="success" style={{ width: "20vh", height: "5vh", color: "white", fontWeight: "bold", fontSize: "14px" }} onClick={handleApprove} disabled={isLoading}> APPROVE</Button>

                    </div>

                )}
            </Container >
        </Modal >

    )
}
export default ModalApprove