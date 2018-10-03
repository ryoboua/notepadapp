import React from 'react'
import { Navbar, NavbarBrand, Button } from 'reactstrap'

const NavBar = ({ name ,showLogOut, logout  }) => (
            <div>
                <Navbar color="danger" dark expand="md">
                    <NavbarBrand href="/">NotePadApp</NavbarBrand>
                    {
                        !showLogOut ? null 
                        :
                         (
                        <React.Fragment>
                            <h4 className="text-white ml-auto p-2" >Hello {name}</h4>
                            <Button type="button" className="ml-auto p-2" outline color="dark" onClick={logout} >Logout</Button>
                        </React.Fragment>
                         )
                    }
                </Navbar>
            </div>
        )


export default NavBar