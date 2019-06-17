import React, { Component } from 'react'
import styles from './styles.module.scss'
import TimerCount from './components/TimerCount/index'
import Status2JSX from './components/Status2JSX/index'
interface Props {
    auction: {
        title?: string,
        status?: number,
        startPrice?: number,
        beginTime?: number,
        endTime?: number,
        corpore?: {
            name?: string,
            quantity?: number,
            measureUnit?: string
        },
        summary?: {
            currentPrice?: number,
            bidNumber?: number
        },
        coverUrls?: string,
        dealPrice?: number,
        dealTime?: number,
        bidType?:number
    }|any
}
export default class AuctionCard extends Component<Props, any> {

    render() {
        const auction = this.props.auction
        return (
            <div className={styles.auctionCard}>
                <img className={styles.auctionImg} src={auction.coverUrls} alt={auction.title} />
                <div className={styles.auctionInfo}>
                    <h3 className={styles.name}>
                        <span className={styles.nameText}>{auction.title}</span>&nbsp;
                        <span className={styles.quantity}>{auction.corpore.quantity}{auction.corpore.measureUnit}</span>
                    </h3>
                    <p className={styles.bindCount}>{auction.summary.bidNumber}次出价</p>
                    <p className={styles.currentPrice}>
                        当前价 <span className={styles.price}>{auction.summary.currentPrice}</span>
                        <span className={styles.unit}>元/{auction.corpore.measureUnit}</span>
                    </p>
                    <TimerCount
                        beginTime={auction.beginTime}
                        endTime={auction.dealTime?auction.dealTime:auction.endTime}
                        bidType={auction.bidType}
                        className={styles.timer}
                        status={auction.status} />
                    <Status2JSX className={styles.tag} status={auction.status} />
                </div>
            </div>
        )
    }
}