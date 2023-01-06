import React from 'react';
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
// import beach from '../assest/images/beach.png'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import NotFound from '../component/notfound';
import AddCountry from './addCountry'


function Income() {
    const navigate = useNavigate()
    const { data: IncomeTrip } = useQuery('incomeCache', async () => {
        const response = await API.get('/trips')
        return response.data.data
    })
    console.log("income", IncomeTrip)
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    let totalIncomeByCountry = {};

    if (IncomeTrip) {
        IncomeTrip.forEach((item) => {
            if (!totalIncomeByCountry[item.country.name]) {
                totalIncomeByCountry[item.country.name] = 0;
            }
            totalIncomeByCountry[item.country.name] += item.price;
        });
    }

    return (
        <Container style={{ marginTop: "10vh" }}>
            <Stack direction='horizontal' style={{ marginRight: "38vh" }}>
                <Col className="text-start fw-bold fs-3 mx-5" sm={9}>Income Trip</Col>
                <div className="d-flex justify-content-end">
                    <AddCountry />

                    <Button onClick={() => navigate('/admin/addtrip')} variant="warning" style={{ width: "20vh", height: "7vh", color: "white", fontWeight: "bold", fontSize: "14px" }}>Add Trip</Button>
                </div>
            </Stack>

            <Row xs="3" className="d-flex justify-content-center mx-3 gap-2">
                {IncomeTrip?.map((items) => (
                    < Col
                        xs="4"
                        className="mt-5 mb-5"
                        style={{ width: "22rem", height: "auto" }}
                    >
                        <Card >
                            <Col className="fw-bold fs-5 bg-white mt-4 mx-2 rounded-end" style={{ position: "absolute", width: "50px", height: "35px", }}>
                                {items?.quota}
                            </Col>
                            <Card.Img variant="top" src={items?.image} alt="images" className="p-2" />
                            <Card.Body className="py-1 px-2 mb-1">
                                <Col className="mb-1 mt-0 py-0 fw-bold fs-5">
                                    {items.title}
                                </Col>
                                <Stack direction="horizontal">
                                    <Col className="fw-bold text-warning text-start fs-6">
                                        {/* {
                                                Object.keys(totalIncomeByCountry).map((country) => (
                                                    <div>Total income for {country}: {formatIDR.format(totalIncomeByCountry[country])}</div>
                                                ))
                                            } */}
                                        {items?.price}
                                    </Col>
                                    <Col className="text-end text-secondary fw-bold">
                                        {items.country.name}
                                    </Col>
                                </Stack>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}

            </Row>
        </Container >

    );
}

export default Income;