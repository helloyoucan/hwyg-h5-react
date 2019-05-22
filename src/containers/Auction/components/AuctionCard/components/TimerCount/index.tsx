import React, { Component } from 'react'
import styles from './styles.module.scss'
interface NoStartProps{
    className?: string,
    time: number
}
function NoStart(props: NoStartProps): JSX.Element {
    const { className, time } = props
    return (
        <div className={[styles.timerCount, styles.bindding, className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>开始时间</span>
            <span className={styles.time}>9月12号&nbsp;10:00</span>
        </div>
    )
}
interface BiddingProps {
    time: number,
    className?: string,
    bidType: number | string
}
function Bidding(props: BiddingProps): JSX.Element {
    const { className, time, bidType } = props
    return (
        <div className={[styles.timerCount, styles.bindding, className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>{bidType === 1 ? '剩余时间' : '距离结束'}</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>时</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>分</span>
            <span className={styles.time}>01</span>
            <span className={styles.timerUnit}>秒</span>
        </div>
    )
}

interface EndProps{
    className?: string,
    time: number
}
function End(props: EndProps): JSX.Element {
    const { className, time } = props
    return (
        <div className={[styles.timerCount, styles.end, className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>结束时间</span>
            <span className={styles.time}>9月12号&nbsp;10:00</span>
        </div>
    )
}
interface CancelProps{
    className?: string,
}
function Cancel(props:CancelProps):JSX.Element {
    const { className } = props
    return (
        <div className={[styles.timerCount,styles.cancel, className ? className : undefined].join(' ')}>
            <span className={styles.timerLabel}>卖家已取消拍卖标的</span>
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
            case 1:
                return <NoStart className={className} time={beginTime}/>
            case 2:
                return <Bidding className={className} time={endTime} bidType={bidType}  />
            case 3:
            case 4:
                return <End className={className} time={endTime}/> 
            case 5:
                return <Cancel className={className} />
            default:
               return (<div></div>)
        }
    }
}