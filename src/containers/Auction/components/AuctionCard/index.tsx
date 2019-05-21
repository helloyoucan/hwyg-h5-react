import React, { Component } from 'react'
import styles from './styles.module.scss'
import TimerCount from './components/TimerCount/index'
import StatusTag from './components/StatusTag/index'
export default class AuctionCard extends Component {
    render() {
        return (
            <div className={styles.auctionCard}>
                <img className={styles.auctionImg} src="#" alt="标的图片" />
                <div className={styles.auctionInfo}>
                    <h3 className={styles.name}>深海带鱼&nbsp;&nbsp;10吨</h3>
                    <p className={styles.bindCount}>2次出价</p>
                    <p className={styles.currentPrice}>
                        当前价 <span className={styles.price}></span>
                        <span className={styles.unit}>元/吨</span>
                    </p>
                    <TimerCount/>
                    <StatusTag/>
                </div>
            </div>
        )
    }
}