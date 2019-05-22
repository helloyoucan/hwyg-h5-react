import React, { Component } from 'react'
import styles from './styles.module.scss'
import AuctionCard from '../AuctionCard/index'
export default class List extends Component {
    render() {
        return (
            <div className={styles.list}>
                <ul>
                    {
                        new Array(6).fill(1).map((item,index)=>(<li key={index}><AuctionCard/></li>))
                    }
                </ul>
            </div>
        )
    }
}