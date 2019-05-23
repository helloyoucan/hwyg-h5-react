import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import List from './components/List/index'

export default class Auction extends Component {
    state = {
        type: 0
    }
    constructor(props: any) {
        super(props)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    handleChangeType(type: number) {
        this.setState({ type })
    }
    render() {
        const { type } = this.state
        return (
            <div className={styles.auction}>
                <Header type={type} updateType={this.handleChangeType} />
                <List type={type} />
            </div>
        )
    }
}