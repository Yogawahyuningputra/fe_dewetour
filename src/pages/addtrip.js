import React, { useState } from 'react'
import { Container, Form, Button, Row, Col, Stack, Alert } from 'react-bootstrap'
import file from '../assest/images/file.png'
// import CountryDropdown from 'country-dropdown-with-flags-for-react';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';

function AddTrip() {
    const [message, setMessage] = useState(null)
    const [preview, setPreview] = useState(null)
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
    const handleChange = (e) => {
        setTrip({
            ...trip, [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
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


            const response = await API.post('/trip', formData, config, trip)
            // console.log("tripss", response)

            const alert = (<Alert variant='success' className='py-1'>
                Success
            </Alert>)
            setMessage(alert)
            // setTrip({
            //     title: '',
            //     country_id: 0,
            //     acomodation: '',
            //     transportation: '',
            //     eat: '',
            //     day: '',
            //     night: '',
            //     date_trip: '',
            //     price: 0,
            //     quota: '',
            //     description: '',
            //     image: '',
            // })
            e.target.reset(trip)
        } catch (error) {
            const alert = (
                <Alert variant='danger' className="py-1">Failed</Alert>
            )
            setMessage(alert)

        }

    })
    // console.log("ini trip", trip)

    const { data: Country, refetch } = useQuery("countryCache", async () => {
        const response = await API.get("/countries")
        return response.data.data
    })


    return (
        <>


            <Container className="w-50 fw-bold bg-light rounded-2 mt-3">

                <Form className="mx-5 text-start" onSubmit={(e) => handleOnSubmit.mutate(e)}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Form.Label className="fs-4 text-center mb-4 mt-2"> Add Trip</Form.Label>
                        </div>
                        <div>
                        </div>
                    </div>

                    {message}

                    <Form.Group className="mb-3" controlId="formGridName" >
                        <Form.Label >Title Trip </Form.Label>
                        <Form.Control name="title" type="text" placeholder="Title" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Stack direction="vertical" className="mb-3">
                        <Form.Label className="">Country</Form.Label>
                        <Form.Select size="md" type="number" name='country_id' style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange}>
                            {Country?.map((data) => (

                                <option value={data.id}>{data.name}</option>

                            ))}

                        </Form.Select>
                    </Stack>
                    <Form.Group className="mb-3" controlId="formGridPassword" >
                        <Form.Label>Acomodation</Form.Label>
                        <Form.Control name="acomodation" type="text" placeholder="Acomodation" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Transportations</Form.Label>
                        <Form.Control name="transportation" placeholder="Transportation" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Eat</Form.Label>
                        <Form.Control name="eat" placeholder="Eat" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8" controlId="formGridCity" >
                            <Form.Label>Durations</Form.Label>
                            <Stack direction="horizontal">
                                <Form.Control name="day" type="number" placeholder="Day" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                                <Form.Label className="mx-2">Day</Form.Label>
                                <Form.Control name="night" type="number" placeholder="Night" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                                <Form.Label className="mx-2">Night</Form.Label>
                            </Stack>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Date Trip</Form.Label>
                        <Form.Control name="date_trip" type='date' placeholder="Date Trip" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="number" placeholder="Price" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Quota</Form.Label>
                        <Form.Control name="quota" placeholder="Quota" style={{ backgroundColor: "#E5E5E5" }} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control

                            name="description"
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px', backgroundColor: "#E5E5E5" }}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Label className="d-flex justify-content-between w-100">
                        <Stack direction="horizontal" className="ps-3 py-2 fs-6 text-start px-2 rounded-1 " style={{ backgroundColor: "#E5E5E5", width: "auto" }}>
                            Attach File
                            <img src={file} alt="file" className="" style={{ width: "15px", height: "25px", marginLeft: "85px" }}></img>
                        </Stack>
                        <input hidden id="file" type="file" name="image" onChange={handleChange}></input>
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
                            className="w-50 mb-5 text-white fw-bold"
                            size="md"
                            type="submit"
                        >
                            Send
                        </Button>
                    </div>
                </Form>
            </Container >
        </>
    )
}
export default AddTrip;


