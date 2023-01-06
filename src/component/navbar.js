import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Button } from 'react-bootstrap';
import Navimg from '../assest/images/nav.png'
import logo from '../assest/images/logo.png'
import Login from '../component/login'
import Register from '../component/register'
import MenuUser from '../component/menuUser'
import MenuAdmin from '../component/menuAdmin'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)


function Navs() {
    const [state, dispatch] = useContext(UserContext)
    // console.log('ini state', state)

    const navigate = useNavigate()

    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)

    const logout = (() => {
        Swal2.fire({
            title: 'Are you sure?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes '
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch({
                        type: "LOGOUT"
                    })
                    navigate("/")
                    Swal.fire(
                        'Logout!',
                        'Your account has been logout.',
                        'success'
                    )
                }
            })


    })

    return (


        <Navbar style={{ backgroundImage: `url(${Navimg}`, height: "11vh", width: "100%" }}>
            <Container>
                {state.user.role === "admin" ? (
                    <Navbar.Brand onClick={() => navigate("/admin")}>
                        <img src={logo} alt="brand"></img>
                    </Navbar.Brand>
                ) : (
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img src={logo} alt="brand"></img>
                    </Navbar.Brand>
                )}
                <Navbar.Brand>
                    {state.isLogin === false ? (
                        <>

                            <Button variant="outline-warning" className="mx-3" onClick={() => setLogin(true)}>Login</Button>

                            <Button variant="warning" className="mx-3 text-dark" onClick={() => setRegister(true)}>Register</Button>

                        </>

                    ) : (

                        <>
                            {state.user.role === "admin" ? (

                                <MenuAdmin logout={logout} />

                            ) : (

                                <MenuUser logout={logout} />
                            )}
                        </>

                    )}
                </Navbar.Brand>
            </Container>
            <Login
                show={login}
                onHide={() => setLogin(false)}
                toregister={() => { setLogin(false); setRegister(true) }}
                loginClose={setLogin}
            />
            <Register
                show={register}
                onHide={setRegister}
                tologin={() => { setRegister(false); setLogin(true) }}
            />
        </Navbar>




    );
}

export default Navs;