import React, { Component } from 'react'
import Popper from '../Popper'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';


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
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createDemoUser = e => {
        e.preventDefault()
        this.props.createDemoUser(this.state.name)
    }
    render() {
        return (
            <div className="dark_template text-center pt-5">
                <div
                    className="p-3 mb-5 bg-white rounded mx-auto"
                    style={{ width: this.props.screenWidth > 425 ? '380px' : '100%' }}
                >
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
                                placeholder="Enter a name to create a demo user"
                                onChange={this.handleChange}
                            />
                            <Popper target="name" />
                        </FormGroup>
                        <div className="text-center" >
                            <Button className="w-50" disabled={this.state.name.length === 0 ? true : false} color="primary" onClick={this.createDemoUser} >Create Demo User</Button>
                        </div>
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
                            <Button className="btn btn-danger w-50" type="submit">Submit</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}