import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import List from './components/List/index'
export default class Goods extends Component {
    render() {
        return (
            <div className={styles.goods}>
                <Header/>
                <List/>
            </div>
        )
    }
}