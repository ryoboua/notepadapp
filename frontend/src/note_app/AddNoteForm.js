import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap'

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
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
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
                        <select 
                            name="backgroundColor" 
                            value={backgroundColor} 
                            onChange={this.handleChange}
                            style={{ backgroundColor }} 
                            >
                                <option value="#ffffff">White</option>
                                <option value="#5555FF">Purple</option>
                        </select>
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
      );
    }
  }