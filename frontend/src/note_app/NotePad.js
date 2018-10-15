import React from 'react'
import Note from './Note'

export default ({ notes, ...props }) => (
    <div className="dark_template text-center pt-5">
        <div className="d-flex flex-wrap justify-content-center mb-5 w-75 mx-auto" >
        { notes.map( note => <Note key={note._id} note={note} {...props} />) }
        </div>
    </div>
)
