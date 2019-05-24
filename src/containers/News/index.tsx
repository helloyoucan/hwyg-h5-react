import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from '@servise/Header/index'
export default class News extends Component {
    render() {
        return (
            <div className={styles.news}>
                <Header/>
            </div>
        )
    }
}