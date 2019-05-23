import React, { Component } from 'react'
import styles from './styles.module.scss'
import StatusJSX from './components/Status2JSX/index'
import CountTag from './components/CountTag/index'
import TimerCount from './components/TimerCount/index'
export default class SceneCard extends Component {
    render() {
        const status = parseInt((Math.random() * 5 + 1) + '', 10)
        return (
            <div className={styles.sceneCard}>
                <img src="#" className={styles.sceneImg} alt="场次图片" />
                <h3 className={styles.sceneName}>
                    场次名称
                </h3>
                <div className={styles.sceneInfo}>
                    <span>开始时间：08-03 09:00</span>
                    <span>标的数量：10</span>
                    <span>结束时间：08-0310:00</span>
                    <span>参与人数：1024</span>
                </div>
                <TimerCount
                        beginTime={Date.now()}
                        endTime={Date.now()}
                        bidType={1}
                        status={status} />
                <StatusJSX className={styles.status} status={status} />
                <CountTag className={styles.count} status={status} lookCount={100} bidCount={55520} />
            </div>
        )
    }
}