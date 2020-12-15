import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/usercontext';
import Sidebar from './sidebar';
import Chat from './chat';
import { Checkbox } from '@material-ui/core';
import io from 'socket.io-client'

export default function Home() {
    var Token = ''
    const context = useContext(UserContext);


    useEffect(() => {
        console.log('effect is here')
        let token = window.localStorage.getItem("token")
        Token = token;
        if (token) {
            context.handleToken(token)
            // check();


        }
    }, [Token])
    useEffect(() => {
        const point = 'http://localhost:5000';
        const socket = io(point);
        console.log(socket);
    }, [])

    const check = () => {
        context.socketOn();
    }

    return (

        <div className="app">
            <div className='app-body'>
                <Sidebar />
                <Chat />
            </div>

        </div>
    )
}
