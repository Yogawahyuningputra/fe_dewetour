import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Card, Stack, Alert } from "react-bootstrap"
import x from '../assest/images/x.png'
import { useMutation } from 'react-query'
import { API } from '../config/api'
import file from '../assest/images/file.png'
import { UserContext } from '../context/userContext'


function UpdateProfile({ show, onHide, setShowClose, dispatch, update }) {
    const [state] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [preview, setPreview] = useState(null)

    const [user, setUser] = useState({

        fullname: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        address: '',
        role: 'user',
        image: '',

    })
    const handleOnChange = (e) => {
        setUser({
            ...user, [e.target.name]:
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
            formData.set("fullname", user.fullname)
            formData.set("email", user.email)
            formData.set("password", user.password)
            formData.set("gender", user.gender)
            formData.set("phone", user.phone)
            formData.set("address", user.address)
            formData.set("role", user.role)
            formData.set("image", user.image[0])

            const response = await API.patch('/user', formData, user, config)

            const profile = await API.get('/checkAuth')


            dispatch({
                type: 'USER_SUCCESS',
                payload: profile.data.data
            })

            setShowClose(false)

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
                show={show} onHide={onHide}
                size="ms p-4"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Stack direction="horizontal" className="d-flex justify-content-end">

                    <img src={x} alt="images" style={{ width: "5vh" }} className="mx-2 mb-3 mt-1" onClick={() => setShowClose(false)} />

                </Stack>

                <Card className="px-5 fw-bold border border-white">

                    <Form.Label className="fs-2 mt-0 mb-3 fw-bold text-center">
                        Update Your Profile
                    </Form.Label>

                    {message}
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-1" controlId="formBasicName" >
                            <Form.Label>Fullname</Form.Label>

                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Name"
                                name="fullname"
                                onChange={handleOnChange}
                                defaultValue={state.user.fullname}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>

                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={handleOnChange}
                                defaultValue={state.user.email}

                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Password </Form.Label>
                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleOnChange}
                                defaultValue={state.user.password}

                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicGender">
                            <Form.Label>Gender </Form.Label>

                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Gender"
                                name="gender"
                                onChange={handleOnChange}
                                defaultValue={state.user.gender}


                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPhone">
                            <Form.Label>Phone </Form.Label>

                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                onChange={handleOnChange}
                                defaultValue={state.user.phone}


                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicAddress">
                            <Form.Label>Address </Form.Label>

                            <Form.Control
                                className="py-2"
                                style={{ borderColor: "#ffc107", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Address"
                                name="address"
                                onChange={handleOnChange}
                                defaultValue={state.user.address}


                            />
                        </Form.Group>
                        <Form.Label className="d-flex justify-content-between w-100">
                            <Stack direction="horizontal" className="ps-3 py-2 fs-6 text-start px-2 mt-2 rounded-1 " style={{ backgroundColor: "#E5E5E5", width: "auto" }}>
                                Upload File
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
                                defaultValue={state.user.image}

                            />
                        )}
                        <Button
                            variant="warning"
                            className="w-100 d-grid gap-2 my-4 text-light fw-bold"
                            size="md"
                            type="submit"
                        >
                            Update
                        </Button>
                    </Form>

                </Card>

            </Modal >
        </>
    )
}

export default UpdateProfile;