import React from 'react';
import { Link } from "react-router-dom";
export default class Home extends React.Component{
    render(){
        return (<div className="index">
        <p>this is home</p>
        <Link to='/index'>index</Link>
        </div>)
    }
}