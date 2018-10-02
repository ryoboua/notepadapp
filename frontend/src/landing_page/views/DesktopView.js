import React, { Component } from 'react'

export default class DesktopView extends Component {
    render() {
        const { images } = this.props
        return (
            <div className="dark_template" >
                <img src={`${images.noteImage.url}`} alt={images.noteImage.altText} height="380" width="225" />
            </div>
        )
    }
}