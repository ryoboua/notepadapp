import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

export default class NavBar extends Component {
    render(){
        return (
            <div>
                <Navbar color="danger" dark expand="md">
                    <NavbarBrand href="/">NotePadApp</NavbarBrand>
                </Navbar>
            </div>
        )
    }
}