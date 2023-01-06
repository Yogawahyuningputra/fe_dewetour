import React, { useState } from 'react'
import { Modal, Form, Button, Card, Stack, Alert } from "react-bootstrap"
import palm from '../assest/images/palm1.png'
import hibiscus from '../assest/images/hibiscus.png'
import { useMutation } from 'react-query'
import { API } from '../config/api'
import '../App.css';

function Register({ show, onHide, tologin }) {

    const [message, setMessage] = useState(null)

    const [user, setUser] = useState({

        fullname: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        address: '',
        role: 'user',
        // image: '',

    })
    const handleOnChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value,
        })

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
            formData.set("fullname", user.fullname)
            formData.set("email", user.email)
            formData.set("password", user.password)
            formData.set("gender", user.gender)
            formData.set("phone", user.phone)
            formData.set("address", user.address)
            formData.set("role", user.role)
            // formData.set("image", user.image[0])

            const response = await API.post('/register', formData, user, config)
            console.log(response)
            if (response.data.code === 200) {
                const alert = (
                    <Alert variant="success" className='py-1'>Success</Alert>
                )
                setMessage(alert)
                setUser({
                    fullname: '',
                    email: '',
                    password: '',
                    gender: '',
                    phone: '',
                    address: '',
                })
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className='py-1'>Failed</Alert>
            )
            setMessage(alert)
            console.log(error)
        }

    })

    return (
        <>
            <Modal
                show={show} onHide={onHide} tologin={tologin}
                size="md p-5"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Stack direction="horizontal" className="d-flex justify-content-between">
                    <img src={palm} alt="images" style={{ width: "17vh", marginBottom: "-2rem" }}></img>

                    <img src={hibiscus} alt="images" style={{ width: "14vh", borderRadius: "10px", marginBottom: "-1rem" }}></img>
                </Stack>

                <Card className="px-4 fw-bold border border-white">

                    <Form.Label className="fs-2 mt-0 mb-3 fw-bold text-center">
                        Register
                    </Form.Label>

                    {message}

                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)} >
                        <Form.Group className="mb-3" controlId="formBasic" style={{ height: '38vh', overflowY: 'scroll' }} >
                            <Form.Group className="mb-3" controlId="formBasicName" >
                                <Form.Label>Fullname</Form.Label>

                                <Form.Control
                                    className="py-2 fs-6"
                                    style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Fullname"
                                    name="fullname"
                                    onChange={handleOnChange}
                                    // value={user.fullname}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email </Form.Label>

                                <Form.Control
                                    className="py-2 fs-6"
                                    style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleOnChange}
                                    // value={user.email}
                                    required


                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password </Form.Label>

                                <Form.Control
                                    className="py-2 fs-6"
                                    style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleOnChange}
                                    // value={user.password}
                                    required


                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicGender">
                                <Form.Label>Gender </Form.Label>
                                <Form.Select className="py-2 fs-6 text-secondary" type="number" name='gender' style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} required>

                                    <option hidden>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone </Form.Label>
                                <Form.Control
                                    className="py-2 fs-6"
                                    style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={handleOnChange}
                                    // value={user.phone}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Address </Form.Label>

                                <Form.Control
                                    className="py-2 fs-6"
                                    style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    onChange={handleOnChange}
                                    // value={user.address}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>
                        <Button
                            variant="warning"
                            className="w-100 d-grid gap-2 fw-bold mt-4"
                            size="md"
                            type="submit"
                        >
                            Register
                        </Button>
                        <p className="mt-4 text-secondary">Don't have an account ? Klik <a href onClick={tologin} className="fw-bold text-secondary text-decoration-none"> Here </a></p>

                    </Form>

                </Card>

            </Modal >
        </>
    )
}

export default Register;