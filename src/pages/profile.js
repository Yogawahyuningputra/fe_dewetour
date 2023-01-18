import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Stack, Button, Table, Badge } from 'react-bootstrap';
import Img from "react-bootstrap/Image";
// import Profileuser from "../assest/images/profileuser.png";
import User from "../assest/images/user.png";
import Phone from "../assest/images/phone.png";
import Address from "../assest/images/address.png";
import Mail from "../assest/images/mail.png";
import Gender from "../assest/images/gender.png";
import { UserContext } from "../context/userContext";
import UpdateProfile from "../component/updateprofile"
import logo from '../assest/images/logo2.png'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import QRCode from 'qrcode.react';
import moment from "moment"
function Profile() {
    const [state, dispatch] = useContext(UserContext)
    // console.log("profile", state)

    const [value, setValue] = useState(null)
    const [update, setUpdate] = useState(false)
    let { data: user, refetch: refetchUser } = useQuery("user", async () => {
        const response = await API.get(`/user/${state.user.id}`)
        return response.data.data
    })
    // console.log(user)

    let { data: History } = useQuery('historyCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })
    // console.log("isi history", state)
    const getByStatus = History?.filter((e) => {
        return e.user_id === state.user.id && (e.status === "Approve" || e.status === "Cancel")

    })

    const handleUpdate = (user) => {
        setUpdate(true)
        setValue(user)

    }

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    return (
        <>

            <Container className="d-flex justify-content-center">
                <Row className="p-3 my-5 rounded-4" style={{ width: "65%", boxShadow: "0px 0px 5px black", backgroundColor: "white" }}>

                    <Stack direction="horizontal" className="text-start col-md-12" xl={6} gap={1} style={{}}>
                        <Stack direction="vertical" gap={2}>

                            <Card.Text style={{ fontWeight: "bold", fontSize: "25px" }}>Personal Info</Card.Text>

                            <Stack direction="horizontal" gap={5} className="mb-2">

                                <Img src={User} style={{ width: "30px", height: "30px" }} />

                                <Stack direction="vertical">
                                    <Card.Text style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}>{user?.fullname}</Card.Text>
                                    <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Fullname</Card.Text>
                                </Stack>
                            </Stack>
                            <Stack direction="horizontal" gap={5} className="mb-2">

                                <Img src={Mail} style={{ width: "30px", height: "30px" }} />

                                <Stack direction="vertical">
                                    <Card.Text style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}>{user?.email}</Card.Text>
                                    <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Email</Card.Text>
                                </Stack>
                            </Stack>
                            <Stack direction="horizontal" gap={5} className="mb-2">
                                <Img src={Gender} style={{ width: "30px", height: "30px" }} />

                                <Stack direction="vertical">
                                    <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{user?.gender}</Card.Text>
                                    <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Gender </Card.Text>
                                </Stack>
                            </Stack>
                            <Stack direction="horizontal" gap={5} className="mb-2">
                                <Img src={Phone} style={{ width: "30px", height: "30px" }} />

                                <Stack direction="vertical">
                                    <Card.Text style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}> +62 {user?.phone}</Card.Text>
                                    <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Phone </Card.Text>
                                </Stack>
                            </Stack>

                            <Stack direction="horizontal" gap={5} className="mb-1">

                                <Img src={Address} style={{ width: "30px", height: "30px" }} />

                                <Stack direction="vertical">
                                    <Card.Text style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}>{user?.address}</Card.Text>
                                    <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Address</Card.Text>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="vertical" className="col-md-2 mt-3">
                            <Img className="rounded-3 "
                                src={user?.image}
                                style={{
                                    width: "auto",
                                    height: "auto",

                                }}
                            />
                            <Button className="mb-1 mt-3 fw-bold" variant="warning" style={{ color: "white" }} onClick={() => handleUpdate(user)}>Change Photo Profile</Button>

                        </Stack>
                    </Stack>
                    <UpdateProfile
                        show={update}
                        onHide={setUpdate}
                        value={value}
                        onSaves={() => {
                            setUpdate(false)
                            refetchUser()
                        }}
                        dispatch={dispatch}
                    />

                </Row>

            </Container>
            {/* ================  import Component History ================ */}

            {/* <History /> */}
            <Container style={{ width: "70%" }}>
                <Card.Text className="text-secondary text-start fw-bold fs-3">History Trip</Card.Text>
                {getByStatus?.map((item, index) => (
                    <Stack direction="vertical" gap={3} style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", padding: "20px" }} className="d-flex justify content-center mt-5 mb-2 rounded-3">

                        <Stack direction="horizontal" gap={3}>
                            <Col sm={9} className="d-flex justify-content-start">
                                <img src={logo} alt="images"></img>
                            </Col>
                            <Col sm={3} className="fw-bold me-3">
                                <Card.Text className="fw-bold">BOOKING</Card.Text>
                                <Card.Text className="text-secondary">{moment(item?.trip?.date_trip).format("DD MMMM YYYY")}</Card.Text>
                            </Col>
                        </Stack>
                        <Stack direction="horizontal" gap={3} className="mt-0">
                            <Col sm={4} className="text-start ms-4">
                                <Card.Text className="fw-bold mb-1">{item?.trip?.title}</Card.Text>
                                <Card.Text className="text-secondary">{item?.trip?.country?.name}</Card.Text>
                                <Card.Text className="text-secondary fs-5">
                                    {
                                        item?.status === "Approve" ?
                                            <label><Badge bg="success">Approve</Badge></label>
                                            : item?.status === "Cancel" ?
                                                <label><Badge bg="danger">Cancel By Admin</Badge></label>
                                                : item?.status === "failed" ?
                                                    <label ><Badge bg="danger">Cancel By System</Badge></label>
                                                    : null
                                    }</Card.Text>

                            </Col>
                            <Col sm={2}>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Date Trip</Card.Text>
                                    <Card.Text className="text-secondary">{moment(item?.trip?.date_trip).format("DD MMMM YYYY")}</Card.Text>

                                </Col>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Acomodations</Card.Text>
                                    <Card.Text className="text-secondary">{item?.trip?.acomodation}</Card.Text>
                                </Col>
                            </Col>
                            <Col sm={3}>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Durations</Card.Text>
                                    <Card.Text className="text-secondary">{item?.trip?.day} Day{item?.trip?.night} night</Card.Text>
                                </Col>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Transportations</Card.Text>
                                    <Card.Text className="text-secondary">{item?.trip?.transportation}</Card.Text>
                                </Col>
                            </Col>
                            <Stack direction="vertical" className="mt-3">
                                {/* <img src={qrcode} alt="images" style={{ width: "140px", marginLeft: "30px" }}></img> */}
                                <QRCode value={item?.status} />
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
                                    <td>{index + 1}</td>
                                    <td>{state.user.fullname}</td>
                                    <td>{state.user.gender}</td>
                                    <td>+62 {state.user.phone}</td>
                                    <td>{state.user.address}</td>
                                    <td className='fw-bold'>Qty</td>
                                    <td colSpan={3} className="text-start fw-bold">: {item?.qty}</td>



                                </tr>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td className='fw-bold'>Total</td>
                                    <td colSpan={3} className="text-start text-danger fw-bold">: {formatIDR.format(item.total)}</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Stack >
                ))}

            </Container >
        </>

    );
}

export default Profile;