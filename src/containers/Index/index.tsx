import React from 'react';
import styles from './styles.module.scss'
import {Redirect} from 'react-router-dom'
export default class Index extends React.Component{
    render() {
        return (
            <div className={styles.index}>
            <span className={styles.loading}></span>
                <Redirect to="/main/home" />
            </div>
        )
    }
}