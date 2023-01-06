import React, { } from 'react';
import { Card, Col, Row, Container, Stack } from 'react-bootstrap';
// import beach from '../assest/images/beach.png'
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { API } from '../config/api';


function Tour({ props }) {
    const navigate = useNavigate()
    let { data: tours } = useQuery('toursCache', async () => {

        const response = await API.get('/trips')
        return response.data.data

    })

    const detailTour = (id) => {
        navigate('/detailTour/' + id)

    }
    // console.log("tour", tours)
    function handleSearch(data) {
        return data.title.toLowerCase().includes(props.search.toLowerCase()) || data.country.name.toLowerCase().includes(props.search.toLowerCase());
    }
    // const filteredTours = tours.filter(handleSearch)

    return (
        <Container className="mt-3">
            <Card.Title className="fw-bold fs-1 mb-3">Group Tour</Card.Title>
            <Row xs="3" className="d-flex justify-content-center gap-2">

                {tours?.map((datas, index) => (
                    <Col key={index} onClick={() => { detailTour(datas?.id) }}
                        xs="4"
                        className="mt-5 mb-5"
                        style={{ width: "22rem", height: "auto", position: "relative" }}
                    >
                        <Card >

                            <Col className="fw-bold fs-5 bg-white mt-4 mx-2 rounded-end" style={{ position: "absolute", width: "60px", height: "35px", }}>

                                {datas?.quota}
                            </Col>
                            <Card.Img variant="top" src={datas?.image} alt="images" className="p-2" />
                            < Card.Body className="py-1 px-2" >

                                <Col className="mb-1 mt-0 py-0 fw-bold fs-5">
                                    {datas?.title}
                                </Col>
                                <Stack direction="horizontal">
                                    <Col className="fw-bold text-warning text-start fs-6">
                                        IDR. {datas?.price}
                                    </Col>
                                    <Col className="text-end text-secondary fw-bold mb-2">
                                        {datas?.country?.name}
                                    </Col>
                                </Stack>
                            </Card.Body>

                        </Card>
                    </Col >
                ))
                }


            </Row >
        </Container >

    );
}

export default Tour;