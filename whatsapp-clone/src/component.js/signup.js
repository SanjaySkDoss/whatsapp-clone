import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';

function Signup(props) {
    const context = useContext(UserContext);
    const [state, setstate] = useState({ username: '', password: '', confirmPassword: '' })
    const handleChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: state.username,
            password: state.password
        }
        axios.post('http://localhost:5000/signup', user)
            .then((res) => {
                console.log(res);
                if (res.data.status === 'success') {
                    console.log('yeah');
                    context.handleToken(res.data.token);
                    window.localStorage.setItem('token', res.data.token);
                    props.history.push("/home")
                }
                else
                    console.log('nope');
            })
    }
    return (
        <div>
            <button type='submit' onClick={context.handleTog}>SUBMIT</button>
            <input type='text' name='username' value={state.username} onChange={handleChange} />
            <input type='password' name='password' value={state.password} onChange={handleChange} />
            <input type='password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
            <button type='submit' onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}

export default Signup
