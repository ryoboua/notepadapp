import React, { Component } from 'react'
import Popper from '../Popper'
import { Form, Label, Input, FormGroup, FormText } from 'reactstrap';


export default class AccUpdatePage extends Component { 
    state = { 
        name: '',
        email: '',
        password: '',
        newPassword_1: '',
        newPassword_2: '',
        disableSaveButton: true,
    }

    componentDidMount() {
        const { name, email } = this.props
        this.setState({ name, email })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const { id } = this.props
        const { name, email, password, newPassword_1, newPassword_2 } = this.state
        this.props.updateAcc({
            id,
            name,
            email,
            password,
            newPassword_1:  newPassword_1.length >= 8 ? newPassword_1 : undefined,
            newPassword_2:  newPassword_2.length >= 8 ? newPassword_2 : undefined,
        })
        this.setState({
            disableSaveButton: true, 
            password: '',
            newPassword_1: '',
            newPassword_2: '',
        })
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        if ( e.target.name === 'password') this.setState({ disableSaveButton: false })
    }
    render() {
        const { name, email, password, newPassword_1, newPassword_2, disableSaveButton } = this.state
        return (
            <div className="dark_template text-center pt-5">
                <div 
                    className="p-3 mb-5 bg-white rounded mx-auto" 
                    style={{ maxWidth: this.props.screenWidth > 425 ? '500px' : '100%' }} 
                 >                    <h3 className="text-black text-left">Update your account.</h3>
                    <br />
                    <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                required
                                value={name}
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
                                value={email} 
                                onChange={this.handleChange} 
                            />
                            <Popper target="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword_1">New Password</Label>
                            <Input 
                                type="password" 
                                name="newPassword_1" 
                                id="newPassword_1" 
                                minLength="8"
                                value={newPassword_1}
                                onChange={this.handleChange} 
                                autoComplete="new-password"
                                />
                            <Popper target="newPassword_1" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword_2">Confirm Password</Label>
                            <Input 
                                type="password" 
                                name="newPassword_2" 
                                id="newPassword_2" 
                                minLength="8"
                                required={ newPassword_1.length >= 8 ? true : false }
                                value={newPassword_2}
                                onChange={this.handleChange} 
                                autoComplete="new-password"
                                />
                            <Popper target="newPassword_2" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Current Password</Label>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                required
                                minLength="8"
                                value={password}
                                onChange={this.handleChange} 
                                autoComplete="new-password"
                                />
                                <FormText color="muted">
                                Enter current password for verification
                                </FormText>
                            <Popper target="password" />
                        </FormGroup>
                        <FormGroup className="text-center" >
                            <Input 
                                className={`btn w-50 btn-${disableSaveButton ? 'success' : 'danger'}`} 
                                disabled={disableSaveButton} 
                                type="submit" 
                                value={ disableSaveButton ? 'Synched' : 'Update'}
                                />
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}