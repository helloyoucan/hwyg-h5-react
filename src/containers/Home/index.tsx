import React from 'react';
// import { Link } from "react-router-dom";
import styles from './styles.module.scss'
// import Icon from '@base/Icon/index'
import {Redirect} from 'react-router-dom'
import Header from './components/Header/index'
export default class Home extends React.Component{
    render() {
        return (
            <div>
                <Header></Header>
            here is home
            </div>
        )
    }
}