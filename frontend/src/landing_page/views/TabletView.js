import React, { Component } from 'react'

export default class TabletView extends Component {
    render() {
        const { images } = this.props
        return (
            <div className="dark_template" >
                {/* <h1 className="text-white" >TabletView</h1> */}
                <img src={`${images.noteImage.url}`} alt={images.noteImage.altText} height="300" width="200" />
            </div>
        )
    }
}