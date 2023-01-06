import React, { useContext } from 'react'
import { Container, Stack, Col, Card, Table, Badge } from 'react-bootstrap'
import logo from '../assest/images/logo2.png'
import invoice from '../assest/images/invoice.png'
import { useQuery } from 'react-query'
import { UserContext } from '../context/userContext'
import { API } from '../config/api'
import QRCode from 'qrcode.react';


function WaitingPayment() {
    const [state, dispatch] = useContext(UserContext)
    const { data: Payment, refetch } = useQuery('waitingCache', async () => {
        const response = await API.get("/transactions")
        return response.data.data

    })
    //get transaction by user
    const getById = Payment?.filter((e) => {
        return e.user_id === state.user.id && e.status === "success"
    })


    return (
        <Container style={{ width: "70%" }}>
            {getById?.map((data, index) => (
                <Card direction="vertical" gap={3} style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", padding: "20px" }} className="d-flex justify content-center mt-5 mb-5 rounded-3">

                    <Stack direction="horizontal" gap={3}>
                        <Col sm={9} className="d-flex justify-content-start">
                            <img src={logo} alt="images"></img>
                        </Col>
                        <Col sm={3} className="fw-bold">
                            <Card.Text className="fw-bold">BOOKING</Card.Text>
                            <Card.Text className="text-secondary">{getById[index].trip?.date_trip}</Card.Text>
                        </Col>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="mt-0">
                        <Col sm={5} className="text-start">
                            <Card.Text className="fw-bold mb-1">{getById[index].trip?.title}</Card.Text>
                            <Card.Text className="text-secondary">{getById[index].trip?.country?.name}</Card.Text>
                            <Card.Text className="text-secondary">
                                {
                                    getById[index].trip?.status === "success" ?
                                        <label ><Badge bg="warning">Waiting Approve</Badge></label>
                                        : getById[index].trip?.status === "Cancel" ?
                                            <label ><Badge bg="danger">Cancel</Badge></label>
                                            : null
                                }

                            </Card.Text>

                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Date Trip</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.date_trip}</Card.Text>
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Acomodations</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.acomodation}</Card.Text>
                            </Col>
                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Durations</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.day} Day {getById[index].trip?.night} night</Card.Text>
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Transportations</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.transportation}</Card.Text>
                            </Col>
                        </Col>
                        <Stack direction="vertical" className=" ms-auto mt-3">
                            <QRCode value={getById[index].trip?.status} />

                            <img src={invoice} alt="images" style={{ width: "auto", marginLeft: "15px" }}></img>
                            <Card.Text className="text-secondary">upload Payment</Card.Text>
                        </Stack>

                    </Stack>
                    <Table >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th colSpan={3}></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{state.user.fullname}</td>
                                <td>Male</td>
                                <td>{state.user.phone}</td>
                                <td>{state.user.address}</td>
                                <td className='fw-bold'>Qty</td>
                                <td colSpan={3} className="text-start fw-bold">: {getById[index].qty}</td>



                            </tr>
                            <tr>
                                <td colSpan={5}></td>
                                <td className='fw-bold'>Total</td>
                                <td colSpan={3} className="text-start text-danger fw-bold">: {getById[index].total}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Card >

            ))
            }
        </Container >
    )
}
export default WaitingPayment