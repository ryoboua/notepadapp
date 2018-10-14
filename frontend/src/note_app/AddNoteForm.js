import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap'
import { GithubPicker } from 'react-color'

export default class AddNoteForm extends Component {
    state = { 
        title: '',
        content: '',
        backgroundColor: '#ffffff',
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.createNote(this.state)
        this.props.toggle()
        this.setState({ 
            title: '',
            content: '',
            backgroundColor: '#ffffff', 
        })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleChangeComplete = color => this.setState({ backgroundColor: color.hex })
      

    render() {
        const {  backgroundColor } = this.state
        return (
            <div>
                <Modal style={{ backgroundColor }} isOpen={this.props.modal}>
                <ModalHeader style={{ backgroundColor }} >Create a note.</ModalHeader>
                <ModalBody style={{ backgroundColor }} >
                    <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                    <FormGroup>
                            <Label for="name">Title</Label>
                            <Input 
                                type="text" 
                                name="title" 
                                id="title" 
                                required 
                                onChange={this.handleChange} 
                                style={{ 
                                    backgroundColor,
                                    color: 'black', 
                                }} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Content</Label>
                            <Input 
                                type="textarea" 
                                name="content" 
                                id="content" 
                                required 
                                onChange={this.handleChange} 
                                style={{ 
                                    backgroundColor,
                                    color: 'black', 
                                }} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <GithubPicker
                                className="mx-auto"
                                color={ backgroundColor }
                                onChangeComplete={ this.handleChangeComplete }
                                triangle="hide"
                                width="212px"
                            />
                        </FormGroup>
                        <FormGroup className="text-center" >
                            <Input className="btn btn-danger w-25" type="submit" value="Save"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ backgroundColor }} >
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>{' '}
                </ModalFooter>
                </Modal>
            </div>
        )
    }
  }