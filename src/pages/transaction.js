import React, { useState } from 'react';
import { Container, Table, Form, Stack, Card, Badge } from 'react-bootstrap';
import Img from 'react-bootstrap/Image';
import Search from '../assest/images/search.png';
import ModalApprove from '../component/modalapprove';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import AddCountry from './addCountry'

// import { UserContext } from '../context/userContext';


function Transaction() {
    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null);
    let { data: transactions, refetch } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })
    // console.log(transactions)

    const handleOnClick = (items) => {
        setSelectedData(items); // Set nilai selectedData saat tombol diklik
        setModal(true);
    };

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })





    return (
        <Container className="mt-5 mb-5">
            <Form.Label className="d-flex justify-content-start fw-bold fs-4 text-dark"> Income Transaction</Form.Label>

            <Card className="d-flex justify-content-center">
                <Stack gap={3}>

                    <Table striped style={{ height: "50vh" }}>

                        <thead >
                            <tr>
                                <th>No.</th>
                                <th>Users</th>
                                <th>Trip</th>
                                <th className='text-start'>Invoice</th>
                                <th>Status Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {transactions?.map((items, index) => (

                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{items?.user?.fullname}</td>
                                    <td>{items?.trip?.title}</td>
                                    <td className="text-danger fw-bold text-start">{formatIDR.format(items?.total)}</td>
                                    <td>
                                        {
                                            items?.status === "success" ?
                                                <label ><Badge bg="warning">Waiting Approve</Badge></label>
                                                : items?.status === "Approve" ?
                                                    <label><Badge bg="success">Approve</Badge></label>
                                                    : items?.status === "Cancel" ?
                                                        <label ><Badge bg="danger">Cancel</Badge></label>
                                                        : null
                                        }
                                    </td>
                                    <td >
                                        <Img onClick={() => handleOnClick(items)}
                                            src={Search}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                justifyContent: "center",
                                            }}
                                        />
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </Table>

                    {/* === props modal approve === */}

                    <ModalApprove
                        show={modal}
                        onHide={setModal}
                        selectedData={selectedData}
                        onApprove={() => {
                            setModal(false);
                            refetch();
                        }}
                        onCancel={() => {
                            setModal(false);
                            refetch();
                        }}

                    />
                </Stack>
            </Card>



        </Container >

    );


}

export default Transaction;