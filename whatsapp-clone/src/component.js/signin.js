import React from 'react';
import {useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';


function Signin(props) {
    const context = useContext(UserContext);
    const [state, setstate] = useState({username:'',password:'',}) 
    var Token = ''
    useEffect(()=>{
        console.log("signin effect is here");
        let token = window.localStorage.getItem("token")
        if(token){
           context.handleToken(token)
           props.history.push("/home")
        }
    },[Token])

    const handleChange = (e)=>{
        setstate({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user = {
            username : state.username,
            password : state.password
        } 
        axios.post('http://localhost:5000/signin',user)
        .then((res)=>{
            console.log(res);
            if(res.data.status === 'success'){
                console.log(res.data.message);
                context.handleToken(res.data.token);
                window.localStorage.setItem('token', res.data.token);
                props.history.push("/home")
            } 
           
            else
            console.log(res.data.message);
        })
    }
    return (
        <div>
            <button type='button'  onClick={context.handleTog}>SUBMIT</button>
            <input type='text' name='username' value={state.username} onChange={handleChange} />
            <input type='password' name='password' value={state.password} onChange={handleChange} />
          
            <button type='submit'  onClick={handleSubmit}>SUBMIT</button>
           


        </div>
    )
}

export default Signin

/*
import React ,{Component} from 'react';
import {useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import jwt_decode from "jwt-decode";


class Signin extends Component {
    static contextType = UserContext
    constructor(props,context) {
        super(props,context);
        this.state = { 
            username:'',
            password:'',
         };
         this.check(context);
    }
  /*  check = (context)=>{
        let token = window.localStorage.getItem("token")
        if(token){
           
           this.context.handleToken(token);
           const decode = jwt_decode(token);
           this.context.updateId({id:decode._id,username:decode.username});
           //Token = token;
           console.log('zzzz');
          console.log(this.props.history);
    }
    }
    componentDidMount(){
        console.log("MOunt is here");
        let token = window.localStorage.getItem("token")
        if(token){
           
           this.context.handleToken(token);
           const decode = jwt_decode(token);
           this.context.updateId({id:decode._id,username:decode.username});
           //Token = token;
           console.log('zzzz');
          this.props.history.push("/home");
    }
}
     handleChange = (e)=>{
        this.setState({...this.state,[e.target.name]:e.target.value})
    }
     handleSubmit = (e)=>{
        e.preventDefault();
        const user = {
            username : this.state.username,
            password : this.state.password
        } 
        axios.post('http://localhost:5000/signin',user)
        .then((res)=>{
            console.log(res);
            if(res.data.status === 'success'){
                console.log(res.data.message);
                this.context.handleToken(res.data.token);
                window.localStorage.setItem('token', res.data.token);
                const decode = jwt_decode(res.data.token);
                this.context.updateId({id:decode._id,username:decode.username});
            } 
           
            else
            console.log(res.data.message);
        })
    }

    render() {
        return (
            <div>
            <button type='button'  onClick={this.context.handleTog}>SUBMIT</button>
            <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          
            <button type='submit'  onClick={this.handleSubmit}>SUBMIT</button>
           


        </div>
        );
    }
}

export default Signin;*/