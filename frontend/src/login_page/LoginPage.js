import React, { Component } from 'react'
import Popper from '../Popper'
import { Form, Label, Input, FormGroup} from 'reactstrap';


export default class LoginPage extends Component { 
    state = { 
        email: '',
        password: '',
        popoverOpen: false,
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.login(this.state)
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    show = () => this.setState({ popoverOpen: true }, 
                    () => setTimeout( () => this.setState({ popoverOpen: false }) && true, 2000 ))
      
    render() {
        return (
            <div className="dark_template text-center pt-5">
                <div className="p-3 mb-5 bg-white rounded w-25 mx-auto" >
                    <h3 className="text-black text-left">Hey! Welcome back.</h3>
                    <br />
                    <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter a email" required onChange={this.handleChange} />
                            <Popper target="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter a random password" required onChange={this.handleChange} />
                            <Popper target="password" />
                        </FormGroup>
                        <FormGroup className="text-center" >
                            <Input className="btn btn-danger w-50" type="submit"/>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}