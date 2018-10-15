import React from 'react'
import { Button } from 'reactstrap'
import Note from './Note'

import images from '../images/images'

const EmptyNoteMessage = ({ toggleShowForm }) => (
    <div>
        <img src={`${images.emptyImage.url}`} alt={images.emptyImage.altText} height="235" width="225" />
        <h3 className="text-white">You don't have any notes saved</h3>
        <Button type="button" className="mt-3" color="primary" onClick={toggleShowForm} >
            Create a Note
        </Button>
    </div>
)

export default ({ notes, ...props }) => (
    
    <div className="dark_template text-center pt-5">
        <div className={`d-flex flex-wrap justify-content-center mb-5 mx-auto ${props.screenWidth > 425 ? 'w-75': 'w-100'}`} >
            { !notes.length && <EmptyNoteMessage toggleShowForm={props.toggleShowForm} /> }
            { notes.map( note => <Note key={note._id} note={note} {...props} />) }
        </div>
    </div>
)