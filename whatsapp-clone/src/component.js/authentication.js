import React, { Component } from 'react';
import Signup from "./signup";
import Signin from "./signin";
import { UserContext } from '../context/usercontext';

class Authentication extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
                {this.context.toggle ? (<Signup {...this.props} />) : (<Signin {...this.props} />)}
            </div>
        )
    }
}

export default Authentication;