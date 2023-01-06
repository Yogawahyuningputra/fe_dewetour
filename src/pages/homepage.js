import React, { useEffect, useState } from 'react'
import homeimg from '../assest/images/homeimg.png'
import guarante from '../assest/images/guarante.png'
import iconuser from '../assest/images/iconuser.png'
import iconuser2 from '../assest/images/iconuser2.png'
import hand from '../assest/images/hand.png'
import love from '../assest/images/love.png'
import { useQuery } from 'react-query'
// import sider from '../assest/images/sidefooter.png'
import { API } from '../config/api'

import Tour from './tour'

import { Card, Col, Row, Form, Button, InputGroup, Stack } from 'react-bootstrap';
const style = {
    text: {

        width: "100%",
        marginTop: "30vh",
        marginLeft: "10rem"
    }
}



function Home() {
    const [search, setSearch] = useState('');

    const onSubmitSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };



    return (
        <>
            <Row className="App mb-5">
                <Stack className="home">
                    <Card.Img src={homeimg} alt="Card image" />
                    <Card.ImgOverlay style={style.text}>
                        <Card.Text className="text-start text-light">
                            <Card.Title style={{ fontSize: "60px", fontWeight: "bold" }}>Explore</Card.Title>
                            <Card.Title style={{ fontSize: "50px" }}>your amazing city together</Card.Title>
                        </Card.Text>
                        <Col>
                            <Form onSubmit={onSubmitSearch}>
                                <InputGroup className="d-flex justify-content-center mt-5 mx-2 w-75">
                                    <Form.Control placeholder="Find great places to holiday" value={search} />
                                    <Button variant="warning" type="submit" className="">
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Card.ImgOverlay>
                </Stack>

                <Stack direction="horizontal" gap={4} style={{ justifyContent: "center", marginTop: "-6rem" }}>
                    <Card style={{ width: '16rem', paddingBottom: "15px", paddingTop: "20px" }}>
                        <div className="d-flex justify-content-center" >
                            <Card.Img style={{ width: '87px' }} variant="top" src={guarante} />
                        </div>
                        <Card.Body>
                            <Card.Title>Best Price Guarantee</Card.Title>
                            <Card.Text>
                                A small river named Duren flows by their place and supplies
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem', paddingBottom: "15px", paddingTop: "20px" }}>
                        <div className="d-flex justify-content-center">
                            <Card.Img style={{ width: '15px', marginRight: "25px" }} variant="top" src={love} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Card.Img style={{ width: '4rem' }} variant="top" src={hand} />
                        </div>
                        <Card.Body>
                            <Card.Title>Travellers Love Us</Card.Title>
                            <Card.Text>
                                A small river named Duren flows by their place and supplies
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem', paddingBottom: "15px", paddingTop: "20px" }}>
                        <div className="d-flex justify-content-center">
                            <Card.Img style={{ width: '5rem' }} variant="top" src={iconuser} />
                        </div>
                        <Card.Body>
                            <Card.Title>Best Travel Agent</Card.Title>
                            <Card.Text>
                                A small river named Duren flows by their place and supplies
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '16rem', paddingBottom: "15px", paddingTop: "20px" }}>
                        <div className="d-flex justify-content-center">
                            <Card.Img style={{ width: '5rem' }} variant="top" src={iconuser2} />
                        </div>
                        <Card.Body>
                            <Card.Title>Best Travel Agent</Card.Title>
                            <Card.Text>
                                A small river named Duren flows by their place and supplies
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </Stack>
            </Row>

            <Tour search={search} />


        </>
    );
}

export default Home;
