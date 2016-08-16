import React, { Component } from 'react';
import $ from 'jquery';
require('./test.less');

class Component1 extends Component {

    render() {
        return (
            <div>
                <h3 className='testH1'>DEMO 7, state</h3>
                <h3 className='testH1'>DEMO 1, render() and life cycle</h3>
                <p>Hello World.</p>
                <hr/>
            </div>
        )
    }
}

export default Component1;