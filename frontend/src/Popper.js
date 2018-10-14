import React from 'react'
import { Popover, PopoverHeader } from 'reactstrap';
import { AppContext } from './AppContext'

export default ({ target }) => (
    <AppContext.Consumer>
        {
            ({ clientError, clearClientError }) => (
                <Popover placement="right" isOpen={clientError && clientError.target === target} target={target}>
                    <PopoverHeader  className="d-flex flex-nowrap" >
                        <div>
                            {clientError && clientError.message}
                        </div>
                        <i className="fas fa-times align-self-center ml-1" onClick={clearClientError} ></i>
                    </PopoverHeader>
                </Popover>
            )
        }
    </AppContext.Consumer >
)