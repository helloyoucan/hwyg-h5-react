import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import Buyer from './components/Buyer/index'
export default class User extends Component {
    render() {
        return (
            <div className={styles.user}>
                <Header/>
                <Buyer/>
            </div>
        )
    }
}