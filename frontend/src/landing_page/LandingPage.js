import React, { Component } from 'react'
//import MediaQuery from 'react-responsive';
import { Container, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

//images
import images from './images/images'

export default class LandingPage extends Component {
    render() {
        return (
            <div className="dark_template" >
                <img src={`${images.noteImage.url}`} alt={images.noteImage.altText} height="235" width="225" />
                <h2 className="text-white">Leave yourself a note on the web.</h2>
                <Container style={{ marginTop: '1.6%' }} >
                    <Link to='/registration' >
                        <Button color="danger" size="lg" style={{ width: '110px' }} >
                            Sign Up
                        </Button>
                    </Link>
                    {' '}
                    <Link to='auth/login' >
                        <Button outline color="danger" size="lg" style={{ width: '110px' }} >
                            Log in
                        </Button>
                    </Link>

                </Container>
            </div>
        )
    }
}