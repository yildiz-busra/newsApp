import React, { Component } from 'react';
import Navi from './commonComponents/Navi';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Navi />
                <h1 className='text-600'>Not Found</h1>
            </div>
        );
    }
}

export default NotFound;

//add a link to homepage