import React, { useState } from 'react';
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
// import beach from '../assest/images/beach.png'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import AddCountry from './addCountry'
import UpdateTrip from '../component/updateTrip';
import { RotatingLines } from 'react-loader-spinner'


function Income() {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const [selectData, setSelectedData] = useState(null)

    const { data: IncomeTrip, refetch: refetchUpdate, isLoading } = useQuery('incomeCache', async () => {
        const response = await API.get('/trips')
        return response.data.data
    })
    // console.log("income", IncomeTrip)
    let totalIncomeByCountry = {};

    if (IncomeTrip) {
        IncomeTrip.forEach((item) => {
            if (!totalIncomeByCountry[item.country.name]) {
                totalIncomeByCountry[item.country.name] = 0;
            }
            totalIncomeByCountry[item.country.name] += item.price;
        });
    }

    const handleUpdate = (items) => {
        setUpdate(true)
        setSelectedData(items)
    }

    // let ID = 0
    // if (IncomeTrip?.length !== 0) {
    //     IncomeTrip?.map((element) => (
    //         ID = element.id

    //     ))

    // }
    // console.log(ID)
    // const handleDelete = async () => {
    //     try {
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete it!'
    //         })
    //             .then(async (result) => {

    //                 if (result.isConfirmed) {
    //                     await API.delete(`/trip/` + ID);

    //                     Swal.fire(
    //                         'Deleted!',
    //                         'Your file has been deleted.',
    //                         'success'
    //                     )
    //                 }
    //             })

    //         refetchUpdate();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    if (isLoading) {
        return (

            <div className='d-flex justify-content-center' style={{ marginTop: "13rem" }}>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
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
                                        {formatIDR.format(items?.price)}
                                    </Col>
                                    <Col className="text-end text-secondary fw-bold">
                                        {items?.country?.name}
                                    </Col>
                                </Stack>
                                <Stack direction="horizontal">
                                    {/* <Col className="text-secondary mb-2 d-flex justify-content-center">
                                        <Button variant="warning" className="text-light fw-bold w-75" onClick={handleDelete} >DELETE</Button>
                                    </Col> */}
                                    <Col className="text-secondary mb-2 d-flex justify-content-center">
                                        <Button variant="warning" size="sm" className="text-light fw-bold w-100 mt-2" onClick={() => handleUpdate(items)}>UPDATE</Button>
                                    </Col>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Row>
            <UpdateTrip
                show={update}
                onHide={setUpdate}
                selectData={selectData}
                onSaves={() => {
                    setUpdate(false)
                    refetchUpdate()
                }}

            />
        </Container >

    );
}

export default Income;