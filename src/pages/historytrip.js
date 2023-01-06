import React, { useContext } from 'react'
import { Container, Stack, Col, Card, Table, Badge } from 'react-bootstrap'
import logo from '../assest/images/logo2.png'
import qrcode from '../assest/images/qr-code.png'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
// import { useParams } from 'react-router-dom'
function History() {
    // let { id } = useParams()
    const { state } = useContext(UserContext)
    let { data: History } = useQuery('historyCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })
    // console.log("isi history", state)
    const getByStatus = History?.filter((e) => {
        return e.user_id === state.user.id && e.status === "Waiting Approve"
    })


    return (
        <Container style={{ width: "70%" }}>
            <Card.Text className="text-secondary text-start fw-bold fs-3">History Trip</Card.Text>
            {getByStatus?.map((item, index) => (
                <Stack direction="vertical" gap={3} style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", padding: "20px" }} className="d-flex justify content-center mt-5 mb-5 rounded-3">

                    <Stack direction="horizontal" gap={3}>
                        <Col sm={9} className="d-flex justify-content-start">
                            <img src={logo} alt="images"></img>
                        </Col>
                        <Col sm={3} className="fw-bold">
                            <Card.Text className="fw-bold">BOOKING</Card.Text>
                            {/* <Card.Text className="text-secondary">{getByStatus?.date}</Card.Text> */}
                        </Col>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="mt-0">
                        <Col sm={5} className="text-start">
                            {/* <Card.Text className="fw-bold mb-1">{item.title}</Card.Text> */}
                            {/* <Card.Text className="text-secondary">{item.country}</Card.Text> */}
                            {/* <Card.Text className="text-secondary"><Badge bg="success">{item.status}</Badge></Card.Text> */}

                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Date Trip</Card.Text>
                                {/* <Card.Text className="text-secondary">{item.date}</Card.Text> */}
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Acomodations</Card.Text>
                                {/* <Card.Text className="text-secondary">{item.acomodation}</Card.Text> */}
                            </Col>
                        </Col>
                        <Col sm={2}>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Durations</Card.Text>
                                {/* <Card.Text className="text-secondary">{item.day} Day{item.night} night</Card.Text> */}
                            </Col>
                            <Col className="text-start">
                                <Card.Text className="fw-bold mb-1">Transportations</Card.Text>
                                {/* <Card.Text className="text-secondary">{item.transportation}</Card.Text> */}
                            </Col>
                        </Col>
                        <Stack direction="vertical" className=" ms-auto mt-3">
                            <img src={qrcode} alt="images" style={{ width: "140px", marginLeft: "15px" }}></img>
                            <Card.Text className="text-secondary">upload payment proof</Card.Text>
                        </Stack>

                    </Stack>
                    <Table >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th colSpan={3}></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>{index + 1}</td> */}
                                {/* <td>{item.fullname}</td> */}
                                <td>Male</td>
                                {/* <td>{item.phone}</td> */}
                                <td className='fw-bold'>Qty</td>
                                {/* <td colSpan={3} className="text-start fw-bold">: {item.qty}</td> */}



                            </tr>
                            <tr>
                                <td colSpan={4}></td>
                                <td className='fw-bold'>Total</td>
                                {/* <td colSpan={3} className="text-start text-danger fw-bold">: {item.totalPay}</td> */}
                            </tr>
                        </tbody>
                    </Table>

                </Stack >
            ))}

        </Container >
    )
}
export default History