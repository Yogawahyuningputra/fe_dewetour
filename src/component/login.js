import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Card, Stack, Alert } from "react-bootstrap"
import palm from '../assest/images/palm1.png'
import hibiscus from '../assest/images/hibiscus.png'
import { useMutation } from 'react-query'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

function Login({ show, onHide, toregister, loginClose }) {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    const [message, setMessage] = useState(null)
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: '',

    })


    const handleOnChange = ((e) => {
        setUserLogin({
            ...userLogin, [e.target.name]: e.target.value,
        })
    })

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData()
            formData.set("email", userLogin.email)
            formData.set("password", userLogin.password)

            const response = await API.post('/login', formData, userLogin, config)

            //send data to usecontext => create token 
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data
            })
            setUserLogin({
                email: '',
                password: '',
            })

            // window.location.reload()
            navigate(0)
        } catch (error) {
            const alert = (
                <Alert variant="danger" className='py-1'>Failed</Alert>
            )
            setMessage(alert)
            console.log(error)
        }

        loginClose(false)

    })



    return (
        <>
            <Modal
                show={show} onHide={onHide} toregister={toregister}
                size="md p-5"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Stack direction="horizontal" className="d-flex justify-content-between mb-0">
                    <img src={palm} alt="images" variant="top" style={{ width: "17vh", marginBottom: "-3rem" }}></img>

                    <img src={hibiscus} alt="images" style={{ width: "15vh", borderRadius: "10px", marginBottom: "-3rem" }}></img>
                </Stack>
                <Form.Label className="fs-2 mt-0 mb-3 fw-bold text-center">
                    Login
                </Form.Label>
                <Card className="px-4 fw-bold border border-white">

                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        {message}

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>

                            <Form.Control
                                className="py-2 fs-6"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={userLogin.email}
                                onChange={handleOnChange}
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
                                value={userLogin.password}
                                onChange={handleOnChange}
                                required

                            />
                        </Form.Group>
                        <Button
                            variant="warning"
                            className="w-100 d-grid gap-2 mt-4 fw-bold"
                            size="md"
                            type="submit"
                        >
                            Login
                        </Button>
                        <p className="mt-4 text-secondary">Don't have an account ? Klik <a href onClick={toregister} className="fw-bold text-secondary text-decoration-none"> Here </a></p>

                    </Form>

                </Card>

            </Modal >
        </>
    )
}

export default Login;