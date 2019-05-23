import React, { Component } from 'react'
import styles from './styles.module.scss'
interface LookCountProps {
    count: number|undefined,
    className?: string
}
function LookCount(props: LookCountProps): JSX.Element {
    const { count, className } = props
    const classList = [styles.countTag]
    className && classList.push(className)
    return (<div className={classList.join(' ')}><p>{count}</p>次围观</div>)
}
interface BidProps {
    count: number|undefined,
    className?: string
}
function BidCount(props: BidProps): JSX.Element {
    const { count, className } = props
    const classList = [styles.countTag]
    className && classList.push(className)
    return (<div className={classList.join(' ')}><p>{count}</p>次出价</div>)
}
interface Props {
    lookCount: number|undefined,
    bidCount: number|undefined,
    status: number,
    className?: string
}
function CountTag(props: Props): JSX.Element {
    const { lookCount, bidCount, status, className } = props
    switch (status) {
        case 1:
            return <LookCount count={lookCount} className={className} />
        default:
            return <BidCount count={bidCount} className={className} />
    }
}
export default CountTag