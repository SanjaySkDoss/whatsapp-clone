import React, { createContext, Component } from 'react';
import jwt_decode from "jwt-decode";
import io from 'socket.io-client'
export const UserContext = createContext();


class UserContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            token: '',
            userid: '',
            username: '',

        };
    }
    handleTog = (e) => {
        console.log('tog');
        this.setState({ ...this.state, toggle: !(this.state.toggle) })
    }
    handleToken = (etoken) => {
        const decode = jwt_decode(etoken);
        this.setState({ ...this.state, userid: decode._id, username: decode.username, token: etoken })
    }
    updateId = (e) => {


    }
    socketOn = () => {

        const point = 'http://localhost:5000';
        const socket = io(point);
        console.log(socket);
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, handleTog: this.handleTog, handleToken: this.handleToken, updateId: this.updateId, socketOn: this.socketOn }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;