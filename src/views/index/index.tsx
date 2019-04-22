import React from 'react';
import { Link } from "react-router-dom";

export default class Index extends React.Component{
    render(){
        return (<div className="index">
        <p>this is index</p>
            <Link to='/home'>home</Link>
        </div>)
    }
}