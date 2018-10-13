import React from 'react'
import { Navbar, NavbarBrand, Button } from 'reactstrap'
import { Link } from 'react-router-dom';


export default ({ name ,showLogOut, logout }) => (
        <div>
            <Navbar color="danger" dark expand="md">
                <NavbarBrand href="/">NotePadApp.</NavbarBrand>
                {
                    !showLogOut ? null 
                    :
                        (
                    <React.Fragment>
                        <h4 className="text-white mx-auto" style={{ paddingLeft: '160px' }} >Hello {name}.</h4>
                        <Link className="mx-1" to='/notes'>
                            <Button type="button" className="" outline color="dark" >Notes</Button>
                        </Link>
                        <Link className="mx-1" to='/users/edit'>
                            <Button type="button" className="" outline color="dark" >Edit Account</Button>
                        </Link>
                        <Button type="button" className="mx-1" outline color="dark" onClick={logout} >Logout</Button>
                    </React.Fragment>
                        )
                }
            </Navbar>
        </div>
        )