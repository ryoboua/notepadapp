import React, { Component } from 'react'
import MediaQuery from 'react-responsive';

//Views
import DesktopView from './views/DesktopView'
import TabletView from './views/TabletView'
import MobileView from './views/MobileView'

//images
import images from './images/images'

const componentsToRender = [
    {
        screenSizeQuery: '(min-width: 1281px)',
        View: (props) => <DesktopView {...props} />
    },
    {
        screenSizeQuery: '(min-width: 760px) and (max-width: 1280px)',
        View: (props) => <TabletView {...props} />
    },
    {
        screenSizeQuery: '(min-width: 320px) and (max-width: 759px)',
        View: (props) => <MobileView {...props} />
    }
]

export default class LandingPage extends Component {
    render() {
        return (
            <React.Fragment>
                {componentsToRender.map( ({ screenSizeQuery, View  }) => (
                    <MediaQuery query={screenSizeQuery} >
                        { 
                            View({
                                images
                            })
                        }
                    </MediaQuery>
                ) )}
            </React.Fragment>
        )
    }
}