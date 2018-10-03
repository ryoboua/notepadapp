import React, { Component } from 'react'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'

export default class Note extends Component {
    state = { 
        title: '',
        content: '',
        //backGroundColor: '',
    }
    componentDidMount(){
        const { _id, title, content, backgroundColor, lastUpdated, created  } = this.props.note
        this.setState({
            _id,
            title,
            content,
            lastUpdated,
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.updateNote(this.state)
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDelete = () => this.props.deleteNote(this.props.note)

    render() {
        const { _id, title, content, backgroundColor, lastUpdated, created  } = this.state
        return (
            <div className="col-lg">
                <Form onSubmit={this.handleSubmit} className="w-100 text-left" >
                    <FormGroup>
                        <Label for="name">Title</Label>
                        <Input type="text" name="title" id="title" value={title} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Content</Label>
                        <Input type="textarea" name="content" id="content" value={content} onChange={this.handleChange} />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter a random password" onChange={this.handleChange} />
                    </FormGroup> */}
                    {/* <p>lastUpdated: { Date(lastUpdated).toString() }</p> */}
                    <FormGroup className="text-center" >
                        <Input className="btn btn-primary w-25" type="submit" value="Save"/>{' '}
                        <Button  className="btn btn-danger w-25" onClick={this.handleDelete} >Delete</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}