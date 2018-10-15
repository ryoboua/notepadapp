import React, { Component } from 'react'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'
import { CirclePicker } from 'react-color'



export default class Note extends Component {
    state = { 
        title: '',
        content: '',
        backgroundColor: '',
        showSaveButton: true,
    }
    componentDidMount(){
        const { _id ,title, content, backgroundColor } = this.props.note
        this.setState({
            _id,
            title,
            content,
            backgroundColor
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.updateNote(this.state)
        this.setState({ showSaveButton: true })
    }
    handleChange = e => this.setState({ [e.target.name]: e.target.value, showSaveButton: false })

    handleDelete = () => this.props.deleteNote(this.props.note)

    handleChangeComplete = color => this.setState({ backgroundColor: color.hex, showSaveButton: false })

    render() {
        const { _id, title, content, backgroundColor, showSaveButton } = this.state
        return (
            <div 
                id={_id}
                style={{ 
                    backgroundColor,
                    border: '5px solid black',
                    borderRadius: '25px',
                    width: '325px',
                    height: 'auto',
                    margin: '1em 0.5em',
                    padding: '1em'
                }} 
            >
                <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                    <FormGroup>
                        <Label style={{ color: 'black' }} className="text-black" for="name">Title</Label>
                        <Input 
                            type="text" 
                            name="title" 
                            id="title" 
                            value={title} 
                            required 
                            onChange={this.handleChange} 
                            style={{ 
                                backgroundColor,
                                color: 'black', 
                            }} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ color: 'black' }} for="email">Content</Label>
                        <Input 
                            type="textarea" 
                            name="content" 
                            id="content" 
                            value={content} 
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
                                width="252px"
                            />
                    </FormGroup>
                    <FormGroup className="text-center" >
                        <Input 
                            className="btn btn-primary w-25" 
                            disabled={showSaveButton} 
                            type="submit" 
                            value="Save"
                        />
                        {' '}
                        <Button  className="btn btn-danger w-25" onClick={this.handleDelete} >Delete</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}