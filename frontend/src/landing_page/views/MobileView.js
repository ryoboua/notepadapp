import React, { Component } from 'react'

export default class MobileView extends Component {
    render() {
        const { images } = this.props
        return (
            <div className="dark_template" >
                {/* <h1 className="text-white" >MobileView</h1> */}
                <img src={`${images.noteImage.url}`} alt={images.noteImage.altText} height="180" width="150" />
            </div>
        )
    }
}