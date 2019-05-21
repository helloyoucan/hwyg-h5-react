import React, { Component } from 'react'
import styles from './styles.module.scss'

export default class Index extends Component {
    render() {
        return (
            <div className={styles.timerCount}>
                        <span className={styles.timerLabel}>剩余时间</span>
                        01<span className={styles.timerUnit}>时</span>
                        04<span className={styles.timerUnit}>分</span>
                        34<span className={styles.timerUnit}>秒</span>
            </div>
        )
    }
}