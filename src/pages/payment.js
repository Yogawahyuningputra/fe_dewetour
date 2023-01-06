import React, { useContext, useState, useEffect } from 'react'
import { Container, Stack, Col, Card, Table, Button, Badge } from 'react-bootstrap'
import logo from '../assest/images/logo2.png'
import ModalPopUp from '../component/paypopup'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import QRCode from 'qrcode.react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

function Payment() {
    const [payment, setPayment] = useState()

    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const { data: Payment, refetch } = useQuery('paymentCache', async () => {
        const response = await API.get("/transactions")
        return response.data.data
        // console.loh("isi response", response)

    })
    //get transaction by user
    const getById = Payment?.filter((e) => {
        return e.user_id === state.user.id
            && (e.status === "Waiting Payment"
                || e.status === "success")


    })
    // console.log("getbyid",getById)
    //get id transaction
    let IdTrans = 0
    if (state.isLogin === true) {
        Payment?.map((element) => (
            IdTrans = element.id

        ))

    }
    console.log("id trans", IdTrans)
    const HandlePay = async (e) => {
        try {

            const config = {
                method: "PATCH",

                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-Type": "multipart/form-data"
                }
            }


            const response = await API.patch("/transaction/" + IdTrans, config)

            const token = response.data.data.token
            // console.log("rs snap =>", response)

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result)
                    navigate("/payment")
                },
                onPending: function (result) {
                    console.log(result)
                    navigate("/")
                },
                onError: function (result) {
                    console.log(result)
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment")
                },
            })

            navigate("/payment")

            refetch()

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-qHCTl1fy6TJrnF4-"

        let scriptTag = document.createElement("script")
        scriptTag.src = midtransScriptUrl
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey)

        document.body.appendChild(scriptTag)
        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])


    const HandleDelete = async (e) => {
        try {
            e.preventDefault()

            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            }
            const response = await API.delete('/transaction/' + IdTrans, config)
            if (response?.status === 200) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Delete Success',
                    showConfirmButton: false,
                })
            }
            refetch()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {getById?.map((data, index) => (

                <Container style={{ width: "70%", marginBottom: "50px" }}>

                    <Stack direction="vertical" gap={3} style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", padding: "20px" }} className="d-flex justify content-center mt-4 mb-3 rounded-3">
                        <Stack direction="horizontal" gap={3}>
                            <Col sm={9} className="d-flex justify-content-start">
                                <img src={logo} alt="images"></img>
                            </Col>
                            <Col sm={3} className="fw-bold">
                                <Card.Text className="fw-bold">BOOKING</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.date_trip}</Card.Text>
                            </Col>
                        </Stack>

                        <Stack direction="horizontal" gap={3} className="mt-0 px-1 py-1">
                            <Col sm={4} className="text-start">
                                <Card.Text className="fw-bold mb-2">{getById[index].trip?.title}</Card.Text>
                                <Card.Text className="text-secondary">{getById[index].trip?.country?.name}</Card.Text>
                                <Card.Text className="text-secondary">
                                    {getById[index].status === "Waiting Payment" ?
                                        <Badge bg="warning">Waiting Payment</Badge>
                                        : getById[index].status === "success" ?
                                            <Badge bg="success">Waiting Approve</Badge>
                                            : getById[index].status === "pending" ?
                                                <Badge bg="warning">Pending</Badge>
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
                            <Col sm={3}>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Durations</Card.Text>
                                    <Card.Text className="text-secondary">{getById[index].trip?.day} Day  {getById[index].trip?.night} night</Card.Text>
                                </Col>
                                <Col className="text-start">
                                    <Card.Text className="fw-bold mb-1">Transportations</Card.Text>
                                    <Card.Text className="text-secondary">{getById[index].trip?.transportation}</Card.Text>
                                </Col>
                            </Col>
                            <Stack direction="vertical" className="mt-3">
                                <QRCode value={getById[index].trip?.status} />
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


                    </Stack >

                    {getById[index].status === "Waiting Payment" || getById[index].status === "pending" ? (
                        <div className="d-flex justify-content-end mb-5">
                            <Button onClick={HandleDelete} variant="danger" style={{ width: "25vh", height: "8vh", color: "white", fontWeight: "bold", fontSize: "20px", marginRight: "10px" }}>Delete</Button>
                            <Button onClick={HandlePay} variant="warning" style={{ width: "25vh", height: "8vh", color: "white", fontWeight: "bold", fontSize: "20px" }}>PAY</Button>
                        </div>
                    ) : (
                        <div />
                    )}
                    <ModalPopUp show={payment} onHide={() => setPayment(false)} />
                </Container >
            ))
            }
        </>
    )
}
export default Payment