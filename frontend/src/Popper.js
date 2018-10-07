import React from 'react'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { AppContext } from './AppContext'

export default ({ target }) => (
    <AppContext.Consumer>
        {
            clientError => (
                <Popover placement="right" isOpen={clientError && clientError.target === target} target={target}>
                <PopoverHeader>{clientError && clientError.message}</PopoverHeader>
            </Popover>
            )
        }
    </AppContext.Consumer >
)