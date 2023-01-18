import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack, Row, Col } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import Swal from 'sweetalert2'
import { RotatingLines } from 'react-loader-spinner'
import file from '../assest/images/file.png'

<RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
/>
export default function Updatetrip(props) {
    const { show, onHide, selectData, onSaves } = props
    // console.log("isi select props", selectData)
    const [preview, setPreview] = useState()
    const [trip, setTrip] = useState({
        title: '',
        country_id: 0,
        acomodation: '',
        transportation: '',
        eat: '',
        day: '',
        night: '',
        date_trip: '',
        price: 0,
        quota: '',
        description: '',
        image: '',

    })
    useEffect(() => {
        setTrip({
            title: selectData?.title,
            country_id: selectData?.country_id,
            acomodation: selectData?.acomodation,
            transportation: selectData?.transportation,
            eat: selectData?.eat,
            day: selectData?.day,
            night: selectData?.night,
            date_trip: selectData?.date_trip,
            price: selectData?.price,
            quota: selectData?.quota,
            description: selectData?.description,
            image: selectData?.image,
        })
    }, [selectData])
    // console.log("isi select props", trip)

    const handleOnChange = (e) => {
        setTrip({
            ...trip, [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    const handleOnSubmit = useMutation(async (e) => {
        if (trip.image === "") {
            Swal.fire('Please Choose Images')
        }
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "Content-Type": "application/form-data"
                }
            }
            const formData = new FormData()
            formData.set('title', trip.title)
            formData.set('country_id', trip.country_id)
            formData.set('acomodation', trip.acomodation)
            formData.set('transportation', trip.transportation)
            formData.set('eat', trip.eat)
            formData.set('day', trip.day)
            formData.set('night', trip.night)
            formData.set('date_trip', trip.date_trip)
            formData.set('price', trip.price)
            formData.set('quota', trip.quota)
            formData.set('description', trip.description)
            formData.set('image', trip.image[0])
            const response = await API.patch(`/trip/${selectData.id}`, formData, config)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })

            onHide()
            onSaves()
            // alert("suksessss bro")
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        }
    })

    const { data: updateCountry } = useQuery("countryCaches", async () => {
        const response = await API.get("/countries")
        return response.data.data
    })
    console.log(updateCountry)
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Trips</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mx-3 text-start overflow-auto" style={{ height: "30rem" }} onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Form.Label className="fs-4 text-center mb-4 mt-2"> Add Trip</Form.Label>
                            </div>
                            <div>
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="formGridName" >
                            <Form.Label >Title Trip </Form.Label>
                            <Form.Control value={trip?.title}
                                name="title" type="text" placeholder="Title" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Stack direction="vertical" className="mb-3">
                            <Form.Label className="">Country</Form.Label>
                            <Form.Select size="md" type="number" value={trip?.country_id} name='country_id' style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange}>
                                {updateCountry?.map((data, i) => (

                                    <option key={i} value={data?.id}>{data?.name}</option>

                                ))}

                            </Form.Select>
                        </Stack>
                        <Form.Group className="mb-3" controlId="formGridPassword" >
                            <Form.Label>Acomodation</Form.Label>
                            <Form.Control value={trip?.acomodation}
                                name="acomodation" type="text" placeholder="Acomodation" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Transportations</Form.Label>
                            <Form.Control value={trip?.transportation} name="transportation" placeholder="Transportation" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Eat</Form.Label>
                            <Form.Control value={trip?.eat} name="eat" placeholder="Eat" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="8" controlId="formGridCity" >
                                <Form.Label>Durations</Form.Label>
                                <Stack direction="horizontal">
                                    <Form.Control value={trip?.day} name="day" type="number" placeholder="Day" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                                    <Form.Label className="mx-2">Day</Form.Label>
                                    <Form.Control value={trip?.night} name="night" type="number" placeholder="Night" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                                    <Form.Label className="mx-2">Night</Form.Label>
                                </Stack>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Date Trip</Form.Label>
                            <Form.Control value={trip?.date_trip} name="date_trip" type='date' placeholder="Date Trip" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={trip?.price} name="price" type="number" placeholder="Price" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Quota</Form.Label>
                            <Form.Control value={trip?.quota} name="quota" placeholder="Quota" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={trip?.description}
                                name="description"
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px', backgroundColor: "#E5E5E5" }}
                                onChange={handleOnChange}

                            />
                        </Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Label className="d-flex justify-content-between w-100">
                            <Stack direction="horizontal" className="ps-3 py-2 fs-6 text-start px-2 rounded-1 " style={{ backgroundColor: "#E5E5E5", width: "auto" }}>
                                Attach File
                                <img src={file} alt="file" className="" style={{ width: "15px", height: "25px", marginLeft: "85px" }}></img>
                            </Stack>
                            <input hidden id="file" type="file" name="image" onChange={handleOnChange}></input>
                        </Form.Label>
                        {preview && (
                            <img
                                variant="left"
                                src={preview}
                                alt={preview}
                                style={{ width: "15rem" }}
                            />
                        )}
                        <div className='d-flex justify-content-center mt-5 mb-5'>
                            <Button
                                variant="warning"
                                className="w-50 mb-1 text-white fw-bold"
                                size="md"
                                type="submit"
                            >
                                Send
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
