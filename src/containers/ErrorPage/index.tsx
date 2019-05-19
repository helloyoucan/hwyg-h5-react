import React, { Component } from 'react'
import styles from './styles.module.scss'

export default class ErrorPage extends Component {
    render() {
        return (
            <div className={styles.error}>
                404
            </div>
        )
    }
}