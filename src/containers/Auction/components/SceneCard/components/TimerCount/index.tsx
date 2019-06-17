import React, { Component } from 'react'
import styles from './styles.module.scss'
interface NoStartProps{
    className?: string,
    time: number
}
function NoStart(props: NoStartProps): JSX.Element {
    const { className } = props
    return (
        <div className={[styles.timerCount, className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>距离开始</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>时</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>分</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>秒</span>
        </div>
    )
}
interface BiddingProps {
    time: number,
    className?: string,
    bidType: number | string
}
function Bidding(props: BiddingProps): JSX.Element {
    const { className, bidType } = props
    return (
        <div className={[styles.timerCount,  className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>{bidType === 1 ? '距离结束' : '距离结束预计'}</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>时</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>分</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>秒</span>
        </div>
    )
}


interface Props {
    beginTime:number,
    endTime:number,
    bidType:number,
    className?: string,
    status: number | string
}

export default class TimerCount extends Component<Props, any> {
    render() {
        const {status,beginTime,endTime,bidType,className}  = this.props
        switch (status) {
            case 0:
                return <NoStart className={className} time={beginTime}/>
            case 1:
                return <Bidding className={className} time={endTime} bidType={bidType}  />
            default:
               return (<div></div>)
        }
    }
}