import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button } from 'reactstrap'

export default class NavBar extends Component {
    render(){
        return (
            <div>
                <Navbar color="danger" dark expand="md">
                    <NavbarBrand href="/">NotePadApp</NavbarBrand>
                    {
                        !this.props.showLogOut ? null 
                        :
                         (
                        <React.Fragment>
                            <h4 className="text-white ml-auto p-2" >Hello {this.props.name}</h4>
                            <Button type="button" className="ml-auto p-2" outline color="dark" onClick={this.props.logout} >Logout</Button>
                        </React.Fragment>
                         )
                    }
                </Navbar>
            </div>
        )
    }
}