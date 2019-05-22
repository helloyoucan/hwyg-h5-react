import React, { Component } from 'react'
import styles from './styles.module.scss'
interface Props {
    className?: string,
    status: number | string
}
function Status2JSX(props:Props): JSX.Element {
    const classList = [styles.statusTag]
    let statusStr =''
    props.className&&classList.push(props.className)
    console.log(props)
    switch (props.status) {
        case 1:
            classList.push(styles.noStart)
            return (<span className={classList.join(' ')}>未开始</span>)
        case 2:
            classList.push(styles.bidding)
            return (<span className={classList.join(' ')}>进行中</span>)
        case 3:
            classList.push(styles.success)
            return (<span className={classList.join(' ')}>已成交</span>)
        case 4:
            classList.push(styles.fail)
            return (<span className={classList.join(' ')}>已流拍</span>)
        case 5:
            classList.push(styles.cancel)
            return (<span className={classList.join(' ')}>已取消</span>)
        default:
            classList.push(styles.unknown)
            return (<span className={classList.join(' ')}>未知</span>)
    }
}
export default Status2JSX