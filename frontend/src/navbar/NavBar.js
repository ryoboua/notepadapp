import React, { Component } from 'react'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'

class NavigationBar extends Component {
    
    state = {
        collapsed: false
    }
      
    toggleNavbar = async () => this.setState({ collapsed: !this.state.collapsed })
    navigateToNotes = () => this.toggleNavbar().then(this.props.history.push('/notes'))
    navigateToAccEditPage = () => this.toggleNavbar().then(this.props.history.push('/users/edit'))
    logout = () => this.toggleNavbar().then(this.props.logout)
    toggleShowForm = () => this.setState({ collapsed: false }, this.props.toggleShowForm)

    render() {
        const { name ,showLogOut } = this.props
        return (
        <div>
            <Navbar color="danger" dark>
                <NavbarBrand href="/">NotePadApp.</NavbarBrand>
                {
                    !showLogOut ? null 
                    :
                        (
                    <React.Fragment>
                        <h4 className="text-white mx-auto" >Hello {name}.</h4>
                        <Button type="button" className="mx-2" outline color="dark" style={{ height: '40px' }} onClick={this.toggleShowForm} >
                            <i className="fas fa-plus"></i>
                        </Button>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" style={{borderColor: '#343a40'}} />
                            <Collapse isOpen={this.state.collapsed} navbar>
                                <Nav className="pt-4" vertical>
                                    <NavItem className="btn btn-outline-dark ml-auto" style={{ width: '185px', border: '0' }} >
                                        <NavLink className="text-white" onClick={this.navigateToNotes} >My Notes</NavLink>
                                    </NavItem>
                                    <NavItem className="btn btn-outline-dark ml-auto" style={{ width: '185px', border: '0' }} >
                                        <NavLink className="text-white" onClick={this.navigateToAccEditPage} >Edit Account</NavLink>
                                    </NavItem>
                                    <NavItem className="btn btn-outline-dark ml-auto" style={{ width: '185px', border: '0' }} >
                                        <NavLink className="text-white" onClick={this.logout} >Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </React.Fragment>
                        )
                }
            </Navbar>
        </div>
        )
    }
}

export default withRouter(NavigationBar)