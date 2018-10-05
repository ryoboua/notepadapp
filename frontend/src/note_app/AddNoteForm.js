import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap'

export default class AddNoteForm extends Component {
    state = { 
        title: '',
        content: '',
        //backgroundColor: '',
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.createNote(this.state)
        this.props.toggle()
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
      return (
        <div>
          <Modal isOpen={this.props.modal}>
            <ModalHeader>Create a note.</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                    <FormGroup>
                        <Label for="name">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter a title" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Content</Label>
                        <Input type="textarea" name="content" id="content" placeholder="Enter a text" onChange={this.handleChange} />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter a random password" onChange={this.handleChange} />
                    </FormGroup> */}
                    <FormGroup className="text-center" >
                        <Input className="btn btn-danger w-25" type="submit" value="Save"/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }