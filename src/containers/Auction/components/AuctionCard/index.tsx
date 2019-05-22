import React, { Component } from 'react'
import styles from './styles.module.scss'
import TimerCount from './components/TimerCount/index'
import Status2JSX from './components/Status2JSX/index'
export default class AuctionCard extends Component {
    render() {
        const status = parseInt((Math.random() * 5 + 1) + '', 10)
        return (
            <div className={styles.auctionCard}>
                <img className={styles.auctionImg} src="#" alt="标的图片" />
                <div className={styles.auctionInfo}>
                    <h3 className={styles.name}><span className={styles.nameText}>深海带鱼</span> <span className={styles.quantity}>10吨</span></h3>
                    <p className={styles.bindCount}>2次出价</p>
                    <p className={styles.currentPrice}>
                        当前价 <span className={styles.price}>20</span>
                        <span className={styles.unit}>元/吨</span>
                    </p>
                    <TimerCount
                        beginTime={Date.now()}
                        endTime={Date.now()}
                        bidType={1}
                        className={styles.timer}
                        status={status} />
                    <Status2JSX className={styles.tag} status={status} />
                </div>
            </div>
        )
    }
}