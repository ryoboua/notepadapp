import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { CirclePicker } from 'react-color'

class AddNoteForm extends Component {
    state = { 
        title: '',
        content: '',
        backgroundColor: '#ffffff',
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.createNote(this.state)
        //TODO should check to see if not was succesfully created before moving on
        this.setState({ 
            title: '',
            content: '',
            backgroundColor: '#ffffff', 
        })
        this.props.toggleShowForm()
        this.props.history.push('/notepadapp/notes')
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleChangeComplete = color => this.setState({ backgroundColor: color.hex })
      

    render() {
        const {  backgroundColor } = this.state
        return (
            <Modal style={{ backgroundColor }} isOpen={this.props.showForm}>
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
                            <CirclePicker
                                className="mx-auto"
                                color={ backgroundColor }
                                onChangeComplete={ this.handleChangeComplete }
                                width={this.props.screenWidth > 425 ? '378px' : '252px'}
                            />
                        </FormGroup>
                        <FormGroup className="text-center" >
                            <Input className="btn btn-danger w-25" type="submit" value="Save"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ backgroundColor }} >
                    <Button color="secondary" onClick={this.props.toggleShowForm}>Cancel</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
  }



export default withRouter(AddNoteForm)