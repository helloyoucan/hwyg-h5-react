import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import Filter from './components/Filter/index'
import List from './components/List/index'
enum Type {
    supply = 2,
    purchase = 1
}
interface State {
    type: Type
}
export default class Goods extends Component {
    state: State = {
        type: 2
    }
    handleChangeType(type: Type) {
        this.setState({ type })
    }
    render() {
        const { type } = this.state
        return (
            <div className={styles.goods}>
                <Header type={type} changeType={this.handleChangeType.bind(this)} />
                <Filter />
                <List type={type} />
            </div>
        )
    }
}