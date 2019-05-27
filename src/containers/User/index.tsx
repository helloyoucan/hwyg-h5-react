import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import Buyer from './components/content/Buyer'
import Seller from './components/content/Seller'
const contentTypes = {
    buyer: Symbol('buyer'),
    seller: Symbol('seller')
}
export default class User extends Component {
    state = {
        activeType: contentTypes.buyer
    }
    constructor(props: any) {
        super(props)
        this.handleUpdateType = this.handleUpdateType.bind(this)
    }
    handleUpdateType(type: Symbol) {
        this.setState({ activeType: type })
    }
    render() {
        const { activeType } = this.state
        return (
            <div className={styles.user}>
                <Header />
                {
                    activeType === contentTypes.buyer 
                    ? <Buyer toType={contentTypes.seller} updateType={this.handleUpdateType} /> 
                    : <Seller toType={contentTypes.buyer} updateType={this.handleUpdateType} />
                }


            </div>
        )
    }
}