import { useState } from 'react';
import { Button, OverlayTrigger, Popover, Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../config/api'


const AddCountry = () => {
    const [message, setMessage] = useState(null)

    const [country, setCountry] = useState({ name: "", })
    const handleOnChange = ((e) => {
        setCountry({
            ...country, [e.target.name]: e.target.value
        })
    })
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }
            const body = JSON.stringify(country)
            const response = await API.post('/country', body, config)
            const alert = (
                <Alert variant="success" className='py-1'>Success</Alert>
            )
            setMessage(alert)
            // console.log("country", response)

        } catch (error) {
            const alert = (
                <Alert variant="danger" className='py-1'>Failed</Alert>
            )
            setMessage(alert)
        }
    })

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover id="popover-basic">

                <Popover.Body>
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        {message}
                        <Form.Group className="my-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Country" onChange={handleOnChange} />
                        </Form.Group>
                        <Button variant="warning" type="submit" className='text-light fw-bold w-50' size="sm">
                            Send
                        </Button>
                    </Form>
                </Popover.Body>
            </Popover>

        }>
            <Button variant="warning" style={{ width: "25vh", height: "7vh", color: "white", fontWeight: "bold", fontSize: "14px", marginRight: "10px" }}>Add Country</Button>

            {/* <Button variant="warning" className="text-light fw-bold">Add Country</Button> */}
        </OverlayTrigger>
    )
};

export default AddCountry;