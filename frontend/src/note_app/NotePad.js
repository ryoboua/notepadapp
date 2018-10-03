import React, { Component } from 'react'
import { Button } from 'reactstrap'
import AddNoteForm from './AddNoteForm'
import Note from './Note'

const AddNote = ({ showForm }) => (
    <div className="col-lg" >
        <Button type="button" className="ml-auto p-2" color="primary" onClick={showForm} >Add Note</Button>
    </div>
)

const FormatNotesArr = notesArr => {
    if(notesArr){
        const newArr = [];
        while(notesArr.length) newArr.push(notesArr.splice(0,3))
        return newArr  
    } else {
        return null
    }
}

export default class NotePad extends Component {
    state = {
        modal: false
      }
  
    toggle = () => {
      this.setState({
        modal: !this.state.modal
      })
    }
    render() {
        return (
            <div>
                <AddNoteForm modal={this.state.modal} toggle={this.toggle} createNote={this.props.createNote} />
                <div className="dark_template text-center pt-5">
                    <div className="p-3 mb-5 bg-white rounded w-75 mx-auto" >
                        { 
                        FormatNotesArr(this.props.notes)
                        .map( (row, index) => (
                            <div key={index} className="row">
                                { row.map( note => <Note 
                                                        key={note._id} 
                                                        note={note} 
                                                        updateNote={this.props.updateNote} 
                                                        deleteNote={this.props.deleteNote}
                                                    /> ) }
                            </div>
                        ) )
                        }
                        <AddNote showForm={this.toggle} />
                    </div>
                </div>
            </div>
        )
    }
}