import React, { Component } from 'react';
import { Link } from "react-router-dom";
export default class Home extends Component{
    render(){
        return (<div className="index">
        <p>this is home</p>
        <Link to='/index'>index</Link>
        </div>)
    }
}