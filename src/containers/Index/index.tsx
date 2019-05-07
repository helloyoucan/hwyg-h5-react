import React from 'react';
import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import {Redirect} from 'react-router-dom'
export default class Index extends React.Component{
    render() {
        return (
            <div className={styles.index}>
            <span className={styles.loading}></span>
                <Redirect to="/home" />
            </div>
        )
    }
}