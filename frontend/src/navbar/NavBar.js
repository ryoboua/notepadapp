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
                            <h4 className="text-white mx-auto" style={{width: '72%'}} >Hello {name}.</h4>
                            <Link className="ml-auto" to='/notes'>
                                <Button type="button" className="ml-auto p-2" outline color="dark" >Notes</Button>
                            </Link>
                            <Link className="ml-auto" to='/users/edit'>
                                <Button type="button" className="ml-auto p-2" outline color="dark" >Edit Account</Button>
                            </Link>
                            <Button type="button" className="ml-auto p-2" outline color="dark" onClick={logout} >Logout</Button>
                        </React.Fragment>
                         )
                    }
                </Navbar>
            </div>
        )