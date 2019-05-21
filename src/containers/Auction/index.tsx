import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import List from './components/List/index'
export default class Auction extends Component {
    render() {
        return (
            <div>
                <Header/>
                <List/>
            </div>
        )
    }
}