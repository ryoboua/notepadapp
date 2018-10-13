import React, { Component } from 'react'
import Popper from '../Popper'
import { Form, Label, Input, FormGroup } from 'reactstrap';


export default class RegisterPage extends Component { 
    state = { 
        name: '',
        email: '',
        password: '',
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.register(this.state)
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="dark_template text-center pt-5">
                <div className="p-3 mb-5 bg-white rounded w-25 mx-auto" >
                    <h3 className="text-black text-left">Create your account.</h3>
                    <br />
                    <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                required 
                                placeholder="Enter a name" 
                                onChange={this.handleChange} 
                            />
                            <Popper target="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="email" 
                                name="email" 
                                id="email" 
                                required 
                                placeholder="Enter a email" 
                                onChange={this.handleChange} 
                            />
                            <Popper target="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                required
                                minLength="8"
                                placeholder="Enter a random password" 
                                onChange={this.handleChange} 
                            />
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