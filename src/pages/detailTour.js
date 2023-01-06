import React, { useState } from 'react'
import { Card, Container, Button, Col, Stack } from 'react-bootstrap'
import beach from '../assest/images/beach.png'
import calender from '../assest/images/calender.png'
import Eat from '../assest/images/eat.png'
import hotel from '../assest/images/hotel.png'
import plane from '../assest/images/plane.png'
import time from '../assest/images/time.png'
import plus from '../assest/images/Plus.png'
import minus from '../assest/images/Minus.png'
import { useParams, useNavigate } from 'react-router-dom'
// import NotFound from '../component/notfound'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import Login from '../component/login'
import Register from '../component/register'


function DetailTours() {
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)


    let navigate = useNavigate()
    let { id } = useParams()

    let { data: detailTour, refetch } = useQuery('detailTourss', async () => {
        const response = await API.get('/trip/' + id)
        refetch()

        return response.data.data
    })
    // console.log("isi trip", detailTour)



    const [person, setPerson] = useState(1)

    function AddPerson() {
        setPerson((prev) => prev + 1)
        if (person === detailTour?.quota) {
            setPerson(detailTour?.quota)
        }
    } console.log("isi qty", detailTour?.quota)
    function LessPerson() {
        if (person !== 1) {
            setPerson((prev) => prev - 1)
        }
    }

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    const qtyfix = person //get last quantity
    const tripID = id
    const totalPay = detailTour?.price * qtyfix

    // console.log("total", totalPay)


    const AddBooking = async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "content-type": "multipart/form-data"
                }
            }
            const formData = {
                trip_id: tripID,
                qty: qtyfix,
                total: totalPay
            }
            const response = await API.post("/transaction", formData, config)

            navigate("/payment")

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Container className="mt-5 mb-5">
                <Stack direction='vertical'>
                    <Card.Title style={{ float: "left" }} className="fw-bold text-start fs-1 mb-3 mx-2">{detailTour?.title}</Card.Title>
                    <Card.Title className="text-secondary text-start fs-5 mb-3 mx-2">{detailTour?.country?.name}</Card.Title>
                </Stack>

                <Stack direction='vertical'>
                    <Col>
                        <Card.Img variant="top" src={detailTour?.image} alt="images" className="p-2" style={{ height: "65vh", borderRadius: "15px" }} />
                    </Col>
                </Stack>

                <Stack direction="horizontal">
                    <Col>
                        <Card.Img variant="top" src={beach} alt="images" className="p-2" style={{ height: "30vh" }} />
                    </Col>
                    <Col>
                        <Card.Img variant="top" src={beach} alt="images" className="p-2" style={{ height: "30vh" }} />

                    </Col>
                    <Col>
                        <Card.Img variant="top" src={beach} alt="images" className="p-2" style={{ height: "30vh" }} />
                    </Col>
                </Stack>
                <Stack direction='vertical'>
                    <Card.Title className="text-secondary text-start fw-bold fs-5 mt-5 mb-3 mx-2">Information Trip</Card.Title>
                </Stack>

                <Stack direction="horizontal" className="d-flex justify-content-center w-100" xs={5} gap={3}>
                    <Col>
                        <Card.Text className='text-secondary fw-bold text-start mx-2 mb-0'>Acomodations</Card.Text>
                        <Stack direction="horizontal">
                            <Card.Img variant="top" src={hotel} alt="images" className="p-2" style={{ width: "8vh" }} />
                            <Card.Text className="fw-bold fs-5">{detailTour?.acomodation}</Card.Text>
                        </Stack>
                    </Col>
                    <Col>
                        <Card.Text className='text-secondary fw-bold text-start mx-2 mb-0'>Transportations</Card.Text>
                        <Stack direction="horizontal">
                            <Card.Img variant="top" src={plane} alt="images" className="p-2" style={{ width: "8vh" }} />
                            <Card.Text className="fw-bold fs-5">{detailTour?.transportation}</Card.Text>
                        </Stack>
                    </Col>
                    <Col>
                        <Card.Text className='text-secondary fw-bold text-start mx-2 mb-0'>Eat</Card.Text>
                        <Stack direction="horizontal">
                            <Card.Img variant="top" src={Eat} alt="images" className="p-2" style={{ width: "8vh" }} />
                            <Card.Text className="fw-bold fs-5">{detailTour?.eat}</Card.Text>
                        </Stack>
                    </Col>
                    <Col>
                        <Card.Text className='text-secondary fw-bold text-start mx-2 mb-0'>Durations</Card.Text>
                        <Stack direction="horizontal">
                            <Card.Img variant="top" src={time} alt="images" className="p-2" style={{ width: "8vh" }} />
                            <Card.Text className="fw-bold fs-5">{detailTour?.day} day {detailTour?.night} night</Card.Text>
                        </Stack>
                    </Col>
                    <Col className="">
                        <Card.Text className='text-secondary fw-bold text-start mx-2 mb-0'>Date Trip</Card.Text>
                        <Stack direction="horizontal">
                            <Card.Img variant="top" src={calender} alt="images" className="p-2" style={{ width: "8vh" }} />
                            <Card.Text className="fw-bold fs-5">{detailTour?.date_trip}</Card.Text>
                        </Stack>
                    </Col>
                </Stack>

                <Stack direction='vertical'>
                    <Card.Title className="text-start fw-bold fs-4 mt-5 mb-3 mx-2">Descriptions</Card.Title>
                    <Card.Title style={{ textAlign: "justify", fontSize: "14px" }} className="text-secondary mt-2 mb-3 mx-2">{detailTour?.description}</Card.Title>
                </Stack>
                <Stack direction='horizontal' className='mb-3 mt-3'>
                    <Col className="text-start text-warning fw-bold fs-2" sm={2}>IDR. {detailTour?.price}</Col>
                    <Col className="text-start fw-bold fs-4" sm={8}>/ Person</Col>
                    <Col sm={1} >
                        <Stack direction='horizontal' className="mx-5">
                            <Card.Img variant="top" src={minus} alt="images" className="p-3" style={{ width: "14vh" }} onClick={LessPerson} />
                            <Card.Text className="d-flex fw-bold fs-4 text-center" style={{ alignItem: "justify" }}>{person}</Card.Text>
                            <Card.Img variant="top" src={plus} alt="images" className="p-3" style={{ width: "14vh" }} onClick={AddPerson} />
                        </Stack>
                    </Col>
                </Stack>
                <hr />
                <Stack direction='horizontal'>
                    <Col className="text-start fw-bold fs-3" sm={9}>Total</Col>
                    <Col className="text-end text-warning fw-bold fs-2" sm={3}>{formatIDR.format(detailTour?.price * person)}</Col>
                </Stack>
                <hr />

                <div className="d-flex justify-content-end">


                    <Button variant="warning" style={{ width: "auto", height: "10vh", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={AddBooking}>BOOK NOW</Button>

                </div>

            </Container >

            <Login
                show={login}
                onHide={() => setLogin(false)}
                toregister={() => { setLogin(false); setRegister(true) }}
            />

            <Register
                show={register}
                onHide={setRegister}
                tologin={() => { setRegister(false); setLogin(true) }}
            />

        </>
    );
}

export default DetailTours;
