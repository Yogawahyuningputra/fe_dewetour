import React, { useContext, useEffect } from 'react'
import './App.css';
import Home from '../src/pages/homepage'
import Detailtour from '../src/pages/detailTour'
import Navbars from '../src/component/navbar'
import Notfound from '../src/component/notfound'

import UserRoute from '../src/component/userRoute'
import AdminRoute from '../src/component/userRoute'
import { Stack, Col, Row } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Payment from './pages/payment'
import WaitingPayment from './pages/waitingpayment'
import Profile from './pages/profile';
import AddTrip from './pages/addtrip';
import AddCountry from './pages/addCountry';
import Income from './pages/incometrip';
import Transaction from './pages/transaction';
import { useNavigate } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext'




function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {

    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.role === 'admin') {
        navigate('/admin')

      } else if (state.user.role === 'user') {
        navigate('/')
      }
    }
  }, [state])


  const CheckUser = async () => {
    try {
      const response = await API.get('/checkAuth')
      // console.log("ini cek", response)

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        })
      }
      //get data user
      let payload = response.data.data

      //get token from localStorage
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload

      })
      // refetch()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      CheckUser()
    }

  }, [])
  return (
    <>
      <Row style={{ backgroundColor: "#E5E5E5" }} className="App">

        <Navbars />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<Transaction />} />
            <Route exact path="/admin/addtrip" element={<AddTrip />} />
            <Route exact path="/admin/incometrip" element={<Income />} />
            <Route exact path="/admin/addCountry" element={<AddCountry />} />
            <Route exact path="*" element={<Notfound />} />
          </Route>

          <Route path="/" element={<UserRoute />}>
            <Route index element={<Home />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/waitingpayment" element={<WaitingPayment />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/detailTour/:id" element={<Detailtour />} />
            <Route exact path="*" element={<Notfound />} />

          </Route >

        </Routes>


        <Stack direction="horizontal">
          <Col sm={12} style={{ backgroundColor: "#FFAF00", height: "7vh", color: "white", textAlign: "center", fontSize: "20px", position: "relative" }}>Copyright @ 2020 Dewe Tour - {state.user.fullname} - NIS. All Rights reserved</Col>

        </Stack>
      </Row>
    </>
  );
}

export default App;

