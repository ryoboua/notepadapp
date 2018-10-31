import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export default ({ isDemoUser, setIsDemoUserToFalse, name, email }) => (
    <Modal isOpen={isDemoUser}>
        <ModalHeader >Your demo user credentials.</ModalHeader>
        <ModalBody >
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Password: 12345678</p>
        </ModalBody>
        <ModalFooter >
            <Button color="danger" onClick={setIsDemoUserToFalse}>OK</Button>{' '}
        </ModalFooter>
    </Modal>
)